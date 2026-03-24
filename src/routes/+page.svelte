<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import PageSection from '$lib/components/PageSection.svelte';
  import { homepageSections } from '$lib/content/site';
</script>

<svelte:head>
  <title>KC Cram Course – The Week Before the Test</title>
  <meta
    name="description"
    content="Four focused 90-minute sessions designed to maximize your ACT score right before test day."
  />
</svelte:head>

<Hero
  eyebrow="ACT prep built for the week before your test"
  title="Raise your ACT score in the week before test day."
  body="Four focused sessions to sharpen pacing, improve strategy, and maximize your performance. Designed for busy students who need results fast."
  primaryCtaLabel="Reserve your seat"
  primaryCtaHref="/classes"
  secondaryCtaLabel="How it works"
  secondaryCtaHref="/how-it-works"
/>

<div class="grid gap-5 md:grid-cols-3">
  {#each homepageSections as section}
    <PageSection {section} />
  {/each}
</div>
