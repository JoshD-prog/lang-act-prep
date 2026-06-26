<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import ScholarshipCalculator from '$lib/components/ScholarshipCalculator.svelte';
  import ScholarshipResultsLeadCapture from '$lib/components/scholarships/ScholarshipResultsLeadCapture.svelte';
  import { getTopNearbyOpportunities } from '$lib/scholarships/display';
  import { getFaqSchema, getSiteUrl, toAbsoluteUrl } from '$lib/seo';
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  const topNearbyOpportunities = $derived(getTopNearbyOpportunities(data.projections));
  const siteUrl = getSiteUrl();
  const calculatorFaqs = [
    {
      question: 'How should I use these scholarship estimates?',
      answer:
        'Use the calculator to see which score increases may matter most. It can help your family decide whether one or two more ACT points could change the college cost conversation.'
    },
    {
      question: 'Is ACT prep worth it if scholarships are not guaranteed?',
      answer:
        'Often, yes. Many published merit tiers reward stronger scores, even though scholarship decisions are never automatic. If a higher ACT score moves your student into a better tier, the return can be many times the cost of prep.'
    },
    {
      question: 'Why do GPA and residency matter?',
      answer:
        'Colleges set their own award rules. Some awards depend on GPA, ACT score, residency, or a mix of all three, so the same ACT score can mean different scholarship opportunities at different schools.'
    },
    {
      question: 'What should we do after we see the results?',
      answer:
        'Look for nearby score targets that create meaningful value, then choose the ACT date and prep option that gives your student the best chance to reach the next tier.'
    }
  ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ACT Scholarship Calculator',
      url: toAbsoluteUrl('/scholarship-calculator', siteUrl),
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'KC Cram Course',
        url: siteUrl
      },
      description:
        'Estimate current scholarship offers and next merit tiers by GPA, ACT score, residency, and school filter.'
    },
    getFaqSchema(calculatorFaqs)
  ];
</script>

<Seo
  title="Scholarship Calculator"
  description="Estimate current scholarship offers and the next merit tiers by GPA, ACT score, residency, and school filter."
  structuredData={structuredData}
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Scholarship calculator</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">Estimate likely offers and next target tiers.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Enter student GPA and ACT score to estimate current scholarship levels, next targets, and longer-range merit tiers for each school.
  </p>
</section>

<form class="color-card mt-8 grid gap-4 rounded-3xl border p-6 md:grid-cols-4" method="GET" action="/scholarship-calculator">
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">GPA</span>
    <input
      name="gpa"
      type="number"
      min="0"
      max="4"
      step="0.01"
      value={data.gpa || ''}
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
      required
    />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">ACT score</span>
    <input
      name="act"
      type="number"
      min="1"
      max="36"
      value={data.act || ''}
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
      required
    />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Residency</span>
    <select
      name="residency"
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
    >
      <option value="KS" selected={data.residency === 'KS'}>Kansas</option>
      <option value="MO" selected={data.residency === 'MO'}>Missouri</option>
      <option value="OTHER" selected={data.residency === 'OTHER'}>Other state</option>
      <option value="NE" selected={data.residency === 'NE'}>Nebraska</option>
      <option value="AR" selected={data.residency === 'AR'}>Arkansas</option>
      <option value="OK" selected={data.residency === 'OK'}>Oklahoma</option>
    </select>
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">School filter</span>
    <select
      name="filter"
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
    >
      <option value="default" selected={data.filter === 'default'}>Closest next targets</option>
      <option value="all" selected={data.filter === 'all'}>Best current offers</option>
      <option value="best" selected={data.filter === 'best'}>Biggest nearby value jumps</option>
      <option value="local" selected={data.filter === 'local'}>Local schools</option>
    </select>
  </label>

  <div class="md:col-span-4 flex items-end">
    <button class="w-full rounded-full bg-sky px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500">Calculate</button>
  </div>
</form>

<section class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-slate-700">
  <p class="font-semibold text-ink">Scholarship data changes over time.</p>
  <p class="mt-1">
    These estimates are based on scholarship information on file and are meant for planning, not a final aid decision.
    Confirm award rules, residency rules, renewal requirements, and application deadlines with each school before making financial decisions.
  </p>
</section>

<section class="warm-card mt-8 rounded-3xl border p-6 md:p-8">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Scholarship calculator FAQ</p>
  <h2 class="mt-2 text-2xl font-black text-ink">How to read the estimates.</h2>
  <div class="mt-5 grid gap-4 md:grid-cols-2">
    {#each calculatorFaqs as faq}
      <article class="rounded-2xl border border-amber-100 bg-white p-5">
        <h3 class="text-base font-extrabold text-ink">{faq.question}</h3>
        <p class="mt-2 text-sm leading-6 text-slate-700">{faq.answer}</p>
        {#if faq.question === 'Is ACT prep worth it if scholarships are not guaranteed?'}
          <a href="/act-prep-roi" class="mt-3 inline-flex text-sm font-bold text-sky hover:underline">
            See ACT prep ROI examples
          </a>
        {/if}
      </article>
    {/each}
  </div>
</section>

<div class="mt-8">
  <ScholarshipCalculator
    projections={data.projections}
    hasSearched={data.hasSearched}
  />
</div>

<ScholarshipResultsLeadCapture
  gpa={data.gpa}
  act={data.act}
  residency={data.residency}
  filter={data.filter}
  hasSearched={data.hasSearched}
  {topNearbyOpportunities}
  {form}
/>
