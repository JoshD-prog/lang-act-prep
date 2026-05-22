<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import Seo from '$lib/components/Seo.svelte';
  import { getSiteUrl, toAbsoluteUrl } from '$lib/seo';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const siteUrl = getSiteUrl();

  const description = $derived(
    `${data.school.name} families can review ACT cram course options, pricing, and upcoming class dates.`
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
      name: `${data.school.name} ACT prep`,
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
    class={`h-64 w-full object-contain p-10 ${data.school.heroImageUrl.includes('FFFFFF') || data.school.heroImageUrl.includes('christ-preparatory-academy') ? 'bg-slate-900' : 'bg-slate-50'}`}
  />
  <div class="p-8">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{data.school.district ?? 'School partner'}</p>
    <h1 class="mt-2 text-4xl font-black text-ink">ACT prep for {data.school.name} families</h1>
    <p class="mt-4 text-lg text-slate-600">{data.school.shortPitch}</p>
    <p class="mt-3 text-lg text-slate-600">
      Families who book early can pay $249 instead of $299.
    </p>
    <div class="mt-6 flex justify-center">
      <a
        href={`/classes?school=${data.school.slug}`}
        use:preserveMarketingParams
        use:trackEnrollCta={{ cta_location: 'school_page', cta_label: 'View class options', school_slug: data.school.slug }}
        class="rounded-full bg-sky px-6 py-3 text-sm font-bold text-white"
      >
        View class options
      </a>
    </div>
  </div>
</section>
