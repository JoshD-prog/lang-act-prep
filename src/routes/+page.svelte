<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import PageSection from '$lib/components/PageSection.svelte';
  import { homepageSections } from '$lib/content/site';
</script>

<svelte:head>
  <title>ACT Prep Classes | Build Scores, Unlock Scholarships</title>
  <meta
    name="description"
    content="ACT prep classes with score strategy, scholarship guidance, and school-specific enrollment paths."
  />
</svelte:head>

<Hero
  eyebrow="ACT prep built for real student schedules"
  title="Score higher, qualify for stronger scholarships, and enroll with confidence."
  body="We help students build score gains with structured coaching, timed practice, and clear scholarship targets across local and flagship colleges."
  primaryCtaLabel="Start enrollment"
  primaryCtaHref="/enroll"
  secondaryCtaLabel="How it works"
  secondaryCtaHref="/how-it-works"
/>

<div class="grid gap-5 md:grid-cols-3">
  {#each homepageSections as section}
    <PageSection {section} />
  {/each}
</div>
