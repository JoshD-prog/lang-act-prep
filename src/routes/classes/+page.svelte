<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import { getClassScheduleDetails } from '$lib/content/classSchedule';
  import { getEarlyBirdOffer } from '$lib/content/earlyBird';
  import Seo from '$lib/components/Seo.svelte';
  import { getFaqSchema, getSiteUrl, toAbsoluteUrl } from '$lib/seo';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const siteUrl = getSiteUrl();

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  const pottersSchoolCatalogUrl = 'https://www.pottersschool.org/course/list/';
  const classDateRanges: Record<string, { startDate: string; endDate: string }> = {
    'act-cram-june-2026': { startDate: '2026-06-08', endDate: '2026-06-11' },
    'act-cram-july-2026': { startDate: '2026-07-06', endDate: '2026-07-09' },
    'act-cram-september-2026': { startDate: '2026-09-14', endDate: '2026-09-17' },
    'act-cram-october-2026': { startDate: '2026-10-12', endDate: '2026-10-15' },
    'act-cram-december-2026': { startDate: '2026-12-07', endDate: '2026-12-10' },
    'act-cram-february-2027': { startDate: '2027-02-22', endDate: '2027-02-25' },
    'act-cram-april-2027': { startDate: '2027-04-05', endDate: '2027-04-08' },
    'act-cram-june-2027': { startDate: '2027-06-07', endDate: '2027-06-10' },
    'act-cram-july-2027': { startDate: '2027-07-05', endDate: '2027-07-08' }
  };
  const classFaqs = [
    {
      question: 'Is ACT prep worth it for my student?',
      answer:
        'A higher ACT score may qualify a student for more scholarship money. The ACT Prep ROI page uses published scholarship tables to show how much the next score tier could be worth.'
    },
    {
      question: 'What does the course include?',
      answer:
        'Each course includes four 90-minute classes during the week before the ACT. Students work on timing, common question types, and what to do when they get stuck.'
    },
    {
      question: 'Will this help if my student has not studied much yet?',
      answer:
        'It can. Students who already understand most of the school material can make useful changes in a week. Students with large gaps in the underlying math or reading skills will usually need more time.'
    },
    {
      question: 'When should we enroll?',
      answer:
        'Enroll as soon as you know the test date your student is targeting. Seats are limited, and the course is scheduled to match the week before the ACT.'
    }
  ];
  const getEnrollHref = (classSlug: string) => {
    const params = new URLSearchParams({ class: classSlug });

    if (data.selectedSchool) {
      params.set('school', data.selectedSchool);
    }

    return `/enroll?${params.toString()}`;
  };

  const structuredData = $derived([
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'ACT Prep Classes | KC Cram Course',
      url: toAbsoluteUrl('/classes', siteUrl),
      description:
        'Compare upcoming ACT cram course dates, pricing, locations, and seat availability for the week before your test.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: data.classes.map((classOffering, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Course',
            name: classOffering.title,
            description:
              'Four 90-minute ACT prep classes in the week before the test, with timing practice and work on common question types.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'KC Cram Course',
              url: siteUrl
            },
            courseMode: classOffering.format,
            hasCourseInstance: {
              '@type': 'CourseInstance',
              name: classOffering.title,
              courseMode: classOffering.format,
              startDate: classDateRanges[classOffering.slug]?.startDate,
              endDate: classDateRanges[classOffering.slug]?.endDate,
              courseSchedule: {
                '@type': 'Schedule',
                repeatFrequency: 'Daily',
                repeatCount: 4,
                byDay: ['https://schema.org/Monday', 'https://schema.org/Tuesday', 'https://schema.org/Wednesday', 'https://schema.org/Thursday']
              },
              location: classOffering.location
                ? {
                    '@type': 'Place',
                    name: classOffering.location,
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: classOffering.location.includes('Piper') ? 'Kansas City' : 'Shawnee',
                      addressRegion: 'KS',
                      addressCountry: 'US'
                    }
                  }
                : undefined
            },
            location: classOffering.location
              ? {
                  '@type': 'Place',
                  name: classOffering.location,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: classOffering.location.includes('Piper') ? 'Kansas City' : 'Shawnee',
                    addressRegion: 'KS',
                    addressCountry: 'US'
                  }
                }
              : undefined,
            offers: {
              '@type': 'Offer',
              url: toAbsoluteUrl(getEnrollHref(classOffering.slug), siteUrl),
              price: (classOffering.priceCents / 100).toFixed(2),
              priceCurrency: 'USD',
              availability:
                classOffering.seatsAvailable > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/SoldOut'
            }
          }
        }))
      }
    },
    getFaqSchema(classFaqs)
  ]);
</script>

<Seo
  title="ACT Prep Classes"
  description="Compare upcoming ACT cram course dates, pricing, locations, and seat availability for the week before your test."
  structuredData={structuredData}
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">ACT Cram Course</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">Choose your test date and reserve your seat.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Each course meets for 90 minutes on Monday through Thursday during the week before the ACT. Students work through real
    questions, practice their timing, and learn how to respond when a question or section is taking too long.
  </p>

  <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-2xl border border-sky-100 bg-white/85 p-4 shadow-sm">
      <p class="text-sm font-bold text-sky-800">What it is</p>
      <p class="mt-1 text-sm text-slate-600">Four-session ACT cram course</p>
    </div>
    <div class="rounded-2xl border border-amber-100 bg-white/85 p-4 shadow-sm">
      <p class="text-sm font-bold text-amber-700">When it happens</p>
      <p class="mt-1 text-sm text-slate-600">During the week before your ACT</p>
    </div>
    <div class="rounded-2xl border border-teal-100 bg-white/85 p-4 shadow-sm">
      <p class="text-sm font-bold text-teal-700">Who it is for</p>
      <p class="mt-1 text-sm text-slate-600">Students who understand the material but lose points to timing and mistakes</p>
    </div>

  </div>
</section>

<section class="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
  <img
    src="/images/course/classroom-wide.jpg"
    alt="Students attending a KC Cram Course ACT prep session"
    class="h-72 w-full object-cover object-center md:h-[26rem]"
    loading="lazy"
    decoding="async"
  />
  <div class="grid gap-4 p-6 md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-8">
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Real classroom format</p>
      <h2 class="mt-2 text-2xl font-black text-ink">A small class leaves room for questions and individual help.</h2>
      <p class="mt-3 text-sm leading-6 text-slate-700">
        I teach each section, work through examples with the class, and watch how students solve problems. That gives me time
        to answer questions and point out the habits that are costing a student time or points.
      </p>
    </div>
    <div class="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
      Four 90-minute sessions during the week before the ACT, with limited seats for each test date.
    </div>
  </div>
</section>

<section class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
  {#each data.classes as classOffering}
    {@const earlyBirdOffer = getEarlyBirdOffer(classOffering.slug)}
    {@const scheduleDetails = getClassScheduleDetails(classOffering)}
    <article class={`rounded-3xl border p-6 shadow-lg transition hover:-translate-y-1 ${classOffering.featured ? 'warm-card' : 'color-card'}`}>
      {#if classOffering.featured}
        <p class="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
          Featured
        </p>
      {/if}

      <h2 class="mt-3 text-2xl font-black text-ink">{classOffering.title}</h2>

      <div class="mt-3 space-y-1 text-sm">
        <p class="font-semibold text-slate-700">{scheduleDetails.dateLabel}</p>
        {#if scheduleDetails.hasTime}
          <p class="font-semibold text-sky-800">Evening sessions: {scheduleDetails.timeLabel}</p>
        {/if}
        {#if scheduleDetails.cadenceLabel}
          <p class="text-slate-600">{scheduleDetails.cadenceLabel}</p>
        {/if}
      </div>

      {#if classOffering.location}
        <p class="mt-1 text-sm text-slate-600">{classOffering.location}</p>
      {/if}

      <p class="mt-2 text-sm text-slate-600">{classOffering.format}</p>

      <div class="mt-4 rounded-2xl border border-sky-100 bg-white/85 p-4">
        <p class="text-3xl font-black text-sky">
          {money.format(classOffering.priceCents / 100)}
        </p>
        <p class="mt-1 text-xs uppercase tracking-wide text-slate-500">
          {classOffering.seatsAvailable} seats remaining
        </p>

        {#if earlyBirdOffer}
          <div class="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
            <p class="font-semibold">
              {earlyBirdOffer.discountedPriceLabel} with code {earlyBirdOffer.code}
            </p>
            <p class="mt-1 text-emerald-800">
              {earlyBirdOffer.deadlineLabel}
            </p>
            <p class="mt-1 font-medium text-emerald-900">
              {earlyBirdOffer.urgencyLabel}
            </p>
          </div>
        {/if}
      </div>

      <p class="mt-4 text-sm text-slate-600">
        After checkout, you will receive an email confirming your enrollment and class details.
      </p>

      <a
        href={getEnrollHref(classOffering.slug)}
        use:preserveMarketingParams
        use:trackEnrollCta={{ cta_location: 'classes_card', cta_label: 'Reserve your seat', class_slug: classOffering.slug }}
        class="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sky px-5 py-2 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500 sm:w-auto"
      >
        Reserve your seat
      </a>
    </article>
  {/each}
</section>

<section class="warm-card mt-8 rounded-3xl border p-6 md:p-8">
  <div class="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
    <div class="max-w-3xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Need a different format?</p>
      <h2 class="mt-2 text-2xl font-black text-ink">Longer online ACT, SAT, and CLT options are also available.</h2>
      <p class="mt-3 text-sm leading-relaxed text-slate-700">
        The Potter's School offers two longer online courses. One covers math and science, and the other covers reading,
        English, and writing. I teach one of these courses, and a colleague teaches the other. Students can enroll in
        either course or both.
      </p>
      <p class="mt-3 text-sm leading-relaxed text-slate-700">
        Both courses prepare students for the ACT, SAT, and CLT through live online classes and scheduled practice assignments.
        Class recordings are available when a student cannot attend live.
      </p>
    </div>

    <div class="lg:text-right">
      <a
        href={pottersSchoolCatalogUrl}
        target="_blank"
        rel="noreferrer"
        class="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 sm:w-auto"
      >
        View online course catalog
      </a>
      <p class="mt-2 max-w-xs text-xs leading-relaxed text-slate-500 lg:ml-auto">
        The catalog includes many courses, look for the SAT/ACT/CLT Prep Courses.
      </p>
    </div>
  </div>
</section>

<section class="color-card mt-8 rounded-3xl border p-6 md:p-8">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Class details</p>
  <h2 class="mt-2 text-2xl font-black text-ink">Questions families ask before enrolling</h2>
  <div class="mt-5 grid gap-4 md:grid-cols-2">
    {#each classFaqs as faq}
      <article class="rounded-2xl border border-sky-100 bg-white p-5">
        <h3 class="text-base font-extrabold text-ink">{faq.question}</h3>
        <p class="mt-2 text-sm leading-6 text-slate-700">{faq.answer}</p>
        {#if faq.question === 'Is ACT prep worth it for my student?'}
          <a href="/act-prep-roi" class="mt-3 inline-flex text-sm font-bold text-sky hover:underline">
            See scholarship examples
          </a>
        {/if}
      </article>
    {/each}
  </div>
</section>

<section class="ink-band mt-8 rounded-3xl border p-6">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Scholarship calculator</p>
      <h2 class="mt-2 text-2xl font-black text-white">See what the next ACT score tier could be worth.</h2>
      <p class="mt-2 text-sm text-sky-50/85">
        Choose a college and enter a current ACT score. The calculator will show the published scholarship amount at that score
        and the next score that may qualify for more aid.
      </p>
      <p class="mt-2 text-sm text-sky-100/75">
        Have questions about paying for prep? Review the
        <a href="/act-prep-roi" class="font-semibold text-white hover:underline"> guide to ACT scores and college cost</a>.
      </p>
    </div>

    <div class="shrink-0">
      <a
        href="/scholarship-calculator"
        class="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-bold text-ink transition hover:bg-slate-100 sm:w-auto"
      >
        Try the scholarship calculator
      </a>
    </div>
  </div>
</section>
