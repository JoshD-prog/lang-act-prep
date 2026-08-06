<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import Seo from '$lib/components/Seo.svelte';
  import { getFaqSchema, getSiteUrl, toAbsoluteUrl } from '$lib/seo';

  const siteUrl = getSiteUrl();
  const lastReviewed = 'May 29, 2026';
  const irsTopic313Url = 'https://www.irs.gov/taxtopics/tc313';
  const irsPublication970Url = 'https://www.irs.gov/publications/p970';

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
  const roiFaqs = [
    {
      question: 'Is ACT prep worth it?',
      answer:
        'It depends on the student and the colleges under consideration. Some colleges publish scholarship tiers tied to ACT scores. Reaching the next tier can change the cost of attending that school by thousands of dollars.'
    },
    {
      question: 'What if my student only improves a little?',
      answer:
        'One or two points can matter when a student is close to a published scholarship cutoff. The calculator shows the next ACT score listed for each school in its data.'
    },
    {
      question: 'Can we use 529 funds for ACT prep?',
      answer:
        'It may be possible in some situations. Current IRS guidance includes certain tutoring or educational classes outside the home and certain college admissions exam fees, but families should confirm their own plan, state rules, and tax situation before using funds.'
    },
    {
      question: 'What should we do before enrolling?',
      answer:
        'Check the scholarship requirements at the colleges your student is considering. Then use the calculator to compare the current score with the next published tier.'
    }
  ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Is ACT prep worth it? ACT prep ROI and 529 strategy',
      url: toAbsoluteUrl('/act-prep-roi', siteUrl),
      dateModified: '2026-05-29',
      datePublished: '2026-05-29',
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'KC Cram Course',
        url: siteUrl
      },
      about: ['ACT prep ROI', '529 plan education expenses', 'Merit scholarships'],
      citation: [irsTopic313Url, irsPublication970Url],
      description:
        'Compare ACT score tiers with published merit scholarships and learn what to confirm before using 529 funds for test preparation.'
    },
    getFaqSchema(roiFaqs)
  ];
</script>

<Seo
  title="Is ACT Prep Worth It?"
  description="Compare ACT score tiers with published merit scholarships and learn what to confirm before using 529 funds for test preparation."
  structuredData={structuredData}
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">ACT scores, scholarships, and 529 plans</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">
    Is ACT prep worth it?
  </h1>
  <p class="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
    The answer depends on the student and the colleges under consideration. At schools with ACT-based merit scholarships,
    a higher score may qualify a student for more aid. The difference between two score tiers can add up over four years.
  </p>
  <p class="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
    Start by checking the published scholarship requirements at the schools your student is considering. Families can
    also ask their plan administrator or tax professional whether their 529 funds may cover the course.
  </p>
  <p class="mt-3 text-sm text-slate-500">Last reviewed: {lastReviewed}</p>

  <div class="mt-8 flex flex-col gap-3 sm:flex-row">
    <a
      href="/classes"
      class="inline-flex items-center justify-center rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500"
    >
      View ACT course dates
    </a>
    <a
      href="/scholarship-calculator"
      class="inline-flex items-center justify-center rounded-full border border-sky-200 bg-white/70 px-6 py-3 text-sm font-bold text-ink transition hover:border-sky hover:text-sky-800"
    >
      Check scholarship tiers
    </a>
  </div>
</section>

<section class="mt-10 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
  <article class="color-card rounded-3xl border p-8">
    <h2 class="text-2xl font-extrabold text-ink">How a score increase could affect college cost</h2>
    <div class="mt-5 rounded-2xl border border-sky-100 bg-white/80 p-6">
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Investment</p>
          <p class="mt-2 text-3xl font-black text-ink">$299 ACT prep course</p>
          <p class="mt-4 text-sm leading-6 text-slate-600">
            The financial value of a score increase depends on the scholarship rules at each college. Published tiers
            make it possible to compare the cost of the course with a possible change in merit aid.
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

      <div class="mt-6 rounded-2xl border border-amber-100 bg-white p-5 text-center shadow-sm shadow-amber-900/10">
        <p class="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Estimated four-year scholarship value</p>
        <p class="mt-2 text-4xl font-black text-ink md:text-5xl">$8,000-$24,000</p>
        <p class="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          Estimated return on a $299 investment
        </p>
        <p class="mt-1 text-3xl font-black text-ink md:text-4xl">26x-80x</p>
      </div>

      <p class="mt-4 text-xs leading-5 text-slate-500">
        Estimates are illustrative and based on common merit scholarship step-ups. Actual results vary by school,
        residency, GPA, current score band, and final score improvement.
      </p>
    </div>

    <p class="mt-5 text-base leading-7 text-slate-700">
      In this example, the student moves from one published scholarship tier to another. The actual award would depend
      on the college's full eligibility rules, application deadlines, and final decision.
    </p>

    <h2 class="mt-10 text-2xl font-extrabold text-ink">A simple student example</h2>
    <div class="mt-5 rounded-2xl border border-amber-100 bg-white p-6">
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
      Some families may be able to use 529 funds for certain tutoring or educational classes. Rules can vary by plan,
      state, and individual tax situation. Confirm eligibility before using the funds.
    </p>

    <h2 class="mt-10 text-2xl font-extrabold text-ink">Can a 529 plan cover ACT or SAT prep?</h2>
    <p class="mt-4 text-base leading-7 text-slate-700">
      Current IRS guidance includes certain tutoring or educational classes outside the home and certain college
      admissions exam fees as K-12 qualified education expense categories. Because ACT and SAT prep are structured
      academic courses, many families now ask whether prep can fit under that language.
    </p>
    <p class="mt-4 text-base leading-7 text-slate-700">
      The IRS lists tuition for certain tutoring or educational classes outside the home and fees for college admissions
      examinations among K-12 qualified education expense categories. Review
      <a href={irsTopic313Url} target="_blank" rel="noreferrer" class="font-semibold text-sky hover:underline">
        IRS Topic 313
      </a>
      and
      <a href={irsPublication970Url} target="_blank" rel="noreferrer" class="font-semibold text-sky hover:underline">
        IRS Publication 970
      </a>
      before relying on 529 funds for a specific expense.
    </p>
    <div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <p class="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">Important note</p>
      <p class="mt-2 text-sm leading-6 text-amber-900">
        ACT and SAT prep are not explicitly named in the current federal language. Families should confirm eligibility
        with their tax professional and plan administrator before using 529 funds this way.
      </p>
    </div>

    <div class="ink-band mt-8 rounded-3xl border px-6 py-7 md:px-8">
      <h2 class="text-2xl font-extrabold">See what one more ACT point could be worth</h2>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
      Enter a GPA, ACT score, and state of residence. The calculator shows the current published tier and the next ACT
      score that may qualify for a larger award.
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
          use:trackEnrollCta={{ cta_location: 'roi_footer', cta_label: 'View course dates' }}
          class="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          View course dates
        </a>
      </div>
    </div>
  </article>

  <aside class="space-y-6">
    <article class="warm-card rounded-3xl border p-6">
      <h2 class="text-xl font-extrabold text-ink">Sources to review</h2>
      <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        <li>
          <a href={irsTopic313Url} target="_blank" rel="noreferrer" class="font-semibold text-sky hover:underline">
            IRS Topic 313: Qualified tuition programs
          </a>
        </li>
        <li>
          <a href={irsPublication970Url} target="_blank" rel="noreferrer" class="font-semibold text-sky hover:underline">
            IRS Publication 970: Tax Benefits for Education
          </a>
        </li>
      </ul>
    </article>

    <article class="color-card rounded-3xl border p-6">
      <h2 class="text-xl font-extrabold text-ink">What to confirm before using 529 funds</h2>
      <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {#each questionsToAsk as question}
          <li class="flex gap-3">
            <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky"></span>
            <span>{question}</span>
          </li>
        {/each}
      </ul>
    </article>

    <article class="color-card rounded-3xl border p-6">
      <h2 class="text-xl font-extrabold text-ink">Documents provided after enrollment</h2>
      <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {#each recordSupport as item}
          <li class="flex gap-3">
            <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500"></span>
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    </article>

    <article class="ink-band rounded-3xl border p-6">
      <h2 class="text-xl font-extrabold text-white">Check the colleges on your student's list</h2>
      <p class="mt-3 text-sm leading-6 text-sky-50/85">
        Use the calculator to compare score tiers, then verify the award rules and deadlines on each college's website.
      </p>
      <a
        href="/scholarship-calculator"
        class="mt-5 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-slate-100"
      >
        Open calculator
      </a>
    </article>
  </aside>
</section>

<section class="warm-card mt-8 rounded-3xl border p-6 md:p-8">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Common questions</p>
  <h2 class="mt-2 text-2xl font-black text-ink">What families should know before deciding</h2>
  <div class="mt-5 grid gap-4 md:grid-cols-2">
    {#each roiFaqs as faq}
      <article class="rounded-2xl border border-amber-100 bg-white p-5">
        <h3 class="text-base font-extrabold text-ink">{faq.question}</h3>
        <p class="mt-2 text-sm leading-6 text-slate-700">{faq.answer}</p>
        {#if faq.question === 'Is ACT prep worth it?'}
          <a href="/scholarship-calculator" class="mt-3 inline-flex text-sm font-bold text-sky hover:underline">
            Compare scholarship tiers
          </a>
        {/if}
      </article>
    {/each}
  </div>
</section>
