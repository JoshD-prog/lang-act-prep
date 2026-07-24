<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import SchoolGrid from '$lib/components/SchoolGrid.svelte';
  import { getSiteUrl, toAbsoluteUrl } from '$lib/seo';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const siteUrl = getSiteUrl();
  const structuredData = $derived([
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'ACT Prep for Kansas City High Schools',
      url: toAbsoluteUrl('/schools', siteUrl),
      description:
        'Find your Kansas City-area high school and explore upcoming ACT prep classes, dates, pricing, locations, and enrollment options.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: data.schools.map((school, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: toAbsoluteUrl(`/schools/${school.slug}`, siteUrl),
          name: `${school.name} ACT prep`
        }))
      }
    }
  ]);
</script>

<Seo
  title="ACT Prep for Kansas City High Schools"
  description="Find your Kansas City-area high school and explore upcoming ACT prep classes, dates, pricing, locations, and enrollment options."
  structuredData={structuredData}
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Kansas City ACT prep</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">ACT prep for Kansas City high schools</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Find your Kansas City-area high school and explore upcoming ACT prep classes, dates, pricing, locations, and enrollment options.
  </p>
</section>

<div class="mt-8">
  <SchoolGrid schools={data.schools} />
</div>
