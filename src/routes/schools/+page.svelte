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
      name: 'Kansas City school-specific ACT prep pages',
      url: toAbsoluteUrl('/schools', siteUrl),
      description: 'Find Kansas City-area school pages for local ACT cram course options.',
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
  title="School-Specific ACT Prep Pages"
  description="Find your Kansas City-area school page and see ACT cram course options for local families."
  structuredData={structuredData}
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Kansas City school pages</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">Choose your school to see ACT prep options for your family.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Find the page for your student's school, then see upcoming ACT cram course options, pricing, and next steps.
  </p>
</section>

<div class="mt-8">
  <SchoolGrid schools={data.schools} />
</div>
