<script lang="ts">
  import { page } from '$app/state';
  import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, getSiteUrl, toAbsoluteUrl } from '$lib/seo';

  type SchemaValue = Record<string, unknown> | Array<Record<string, unknown>>;

  let {
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_OG_IMAGE,
    robots = 'index, follow',
    type = 'website',
    siteName = SITE_NAME,
    canonicalPath,
    structuredData
  }: {
    title: string;
    description?: string;
    image?: string;
    robots?: string;
    type?: string;
    siteName?: string;
    canonicalPath?: string;
    structuredData?: SchemaValue;
  } = $props();

  const resolvedTitle = $derived(title.includes(siteName) ? title : `${title} | ${siteName}`);
  const siteUrl = $derived(getSiteUrl(page.url.origin));
  const resolvedCanonicalPath = $derived(canonicalPath ?? page.url.pathname);
  const canonicalUrl = $derived(toAbsoluteUrl(resolvedCanonicalPath, siteUrl));
  const imageUrl = $derived(toAbsoluteUrl(image, siteUrl));
  const structuredDataJson = $derived(structuredData ? JSON.stringify(structuredData) : '');
</script>

<svelte:head>
  <title>{resolvedTitle}</title>
  <meta name="description" content={description} />
  <meta name="robots" content={robots} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={resolvedTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={imageUrl} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={resolvedTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />

  {#if structuredDataJson}
    <script type="application/ld+json">
      {structuredDataJson}
    </script>
  {/if}
</svelte:head>
