<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import SchoolLogo from '$lib/components/SchoolLogo.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { getLandingPageEarlyBirdOffer } from '$lib/content/earlyBird';
  import { getOrganizationSchema, getSiteUrl, toAbsoluteUrl } from '$lib/seo';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const siteUrl = getSiteUrl();
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  const description = $derived(
    `View KC Cram Course ACT prep dates, locations, pricing, and enrollment information for ${data.school.name} students.`
  );
  const schoolPageName = $derived(
    `ACT prep for ${data.school.name} students in the Kansas City area`
  );
  const earlyBirdPromotion = $derived(getLandingPageEarlyBirdOffer(data.classes));
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
    getOrganizationSchema(siteUrl),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: schoolPageName,
      url: toAbsoluteUrl(`/schools/${data.school.slug}`, siteUrl),
      description,
      isPartOf: {
        '@type': 'WebSite',
        name: 'KC Cram Course',
        url: siteUrl
      },
      about: {
        '@type': 'School',
        name: data.school.name,
        areaServed: data.school.district,
        description: `ACT preparation classes available to ${data.school.name} students during the week before each ACT.`
      }
    }
  ]);
</script>

<Seo
  title={`ACT Prep for ${data.school.name}`}
  description={description}
  image={data.school.heroImageUrl}
  structuredData={structuredData}
/>

<section class="page-hero overflow-hidden">
  <SchoolLogo school={data.school} frameClass="h-48 w-full p-8 sm:h-64 sm:p-10" />
  <div class="p-6 sm:p-8 md:p-10">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">{data.school.district ?? 'School partner'}</p>
    <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">ACT prep for {data.school.name} families</h1>
    <p class="mt-4 text-lg text-slate-600">
      Students from {data.school.name} can enroll in any available KC Cram Course. Each course meets Monday through
      Thursday during the week before the ACT.
    </p>
    {#if earlyBirdPromotion}
      <p class="mt-3 text-lg text-slate-600">
        Current offer: {earlyBirdPromotion.offer.discountedPriceLabel} with code {earlyBirdPromotion.offer.code} for
        {earlyBirdPromotion.classOffering.title}. Regular price is
        {money.format(earlyBirdPromotion.classOffering.priceCents / 100)}.
      </p>
    {/if}
    <p class="mt-3 text-base leading-7 text-slate-600">
      View the dates and locations below, then choose the class that matches your student's ACT date. You can also use
      the scholarship calculator to compare the student's current score with published merit-aid tiers.
    </p>
    <div class="mt-6 flex justify-center md:justify-start">
      <a
        href={`/classes?school=${data.school.slug}`}
        use:preserveMarketingParams
        use:trackEnrollCta={{ cta_location: 'school_page', cta_label: 'View class options', school_slug: data.school.slug }}
        class="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500 sm:w-auto"
      >
        View class options
      </a>
    </div>
  </div>
</section>
