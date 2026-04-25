<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import { earlyBirdOffers } from '$lib/content/earlyBird';
  import Seo from '$lib/components/Seo.svelte';
  import { getSiteUrl, toAbsoluteUrl } from '$lib/seo';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const siteUrl = getSiteUrl();

  const description = $derived(
    `${data.school.name} families can review class options, scholarship planning support, and school-specific messaging before starting enrollment.`
  );
  const structuredData = $derived([
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Schools',
          item: toAbsoluteUrl('/schools', siteUrl)
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: data.school.name,
          item: toAbsoluteUrl(`/schools/${data.school.slug}`, siteUrl)
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${data.school.name} enrollment page`,
      url: toAbsoluteUrl(`/schools/${data.school.slug}`, siteUrl),
      description,
      isPartOf: {
        '@type': 'WebSite',
        name: 'KC Cram Course',
        url: siteUrl
      },
      about: {
        '@type': 'Thing',
        name: data.school.name,
        description: data.school.shortPitch
      }
    }
  ]);
</script>

<Seo
  title={data.school.name}
  description={description}
  image={data.school.heroImageUrl}
  structuredData={structuredData}
/>

<section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
  <img
    src={data.school.heroImageUrl}
    alt={data.school.name}
    class="h-64 w-full object-cover"
    loading="eager"
    fetchpriority="high"
    decoding="async"
    width="1600"
    height="900"
  />
  <div class="p-8">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{data.school.district ?? 'School partner'}</p>
    <h1 class="mt-2 text-4xl font-black text-ink">{data.school.name} enrollment page</h1>
    <p class="mt-4 text-lg text-slate-600">{data.school.shortPitch}</p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a
        href={`/enroll?school=${data.school.slug}`}
        use:preserveMarketingParams
        use:trackEnrollCta={{ cta_location: 'school_page', cta_label: 'Start enrollment', school_slug: data.school.slug }}
        class="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
      >
        Start enrollment
      </a>
      <a href="/classes" class="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700">View class options</a>
    </div>
  </div>
</section>

<section class="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Early enrollment savings</p>
  <h2 class="mt-2 text-2xl font-black text-ink">Families who book early can pay $249 instead of $299.</h2>
  <p class="mt-3 max-w-3xl text-sm text-slate-700">
    Enter the matching promo code during Stripe checkout before that class deadline passes.
  </p>

  <div class="mt-5 grid gap-3 md:grid-cols-3">
    {#each earlyBirdOffers as offer}
      <div class="rounded-2xl border border-emerald-200 bg-white p-4">
        <p class="text-sm font-semibold text-slate-900">{offer.discountedPriceLabel}</p>
        <p class="mt-1 text-base font-black text-emerald-800">{offer.code}</p>
        <p class="mt-2 text-sm text-slate-700">{offer.deadlineLabel}</p>
      </div>
    {/each}
  </div>
</section>
