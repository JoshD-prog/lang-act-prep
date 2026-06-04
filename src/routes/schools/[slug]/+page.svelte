<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import SchoolLogo from '$lib/components/SchoolLogo.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { getOrganizationSchema, getSiteUrl, toAbsoluteUrl } from '$lib/seo';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const siteUrl = getSiteUrl();

  const description = $derived(
    `${data.school.name} families can review Kansas City-area ACT prep options, pricing, upcoming class dates, and scholarship planning tools.`
  );
  const schoolPageName = $derived(
    `ACT prep for ${data.school.name} students in the Kansas City area`
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
        description: data.school.shortPitch
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
  <SchoolLogo school={data.school} frameClass="h-64 w-full p-10" />
  <div class="p-8 md:p-10">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">{data.school.district ?? 'School partner'}</p>
    <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">ACT prep for {data.school.name} families</h1>
    <p class="mt-4 text-lg text-slate-600">{data.school.shortPitch}</p>
    <p class="mt-3 text-lg text-slate-600">
      Families who book early can pay $249 instead of $299.
    </p>
    <p class="mt-3 text-base leading-7 text-slate-600">
      This page helps {data.school.name} families compare local ACT prep timing, class pricing, and scholarship planning
      tools without starting from a generic test-prep search.
    </p>
    <div class="mt-6 flex justify-center md:justify-start">
      <a
        href={`/classes?school=${data.school.slug}`}
        use:preserveMarketingParams
        use:trackEnrollCta={{ cta_location: 'school_page', cta_label: 'View class options', school_slug: data.school.slug }}
        class="rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500"
      >
        View class options
      </a>
    </div>
  </div>
</section>
