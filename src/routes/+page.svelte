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
  eyebrow="ACT prep designed for real student schedules"
  title="Score higher, qualify for stronger scholarships, and enroll with confidence."
  body="We help students reach their goals with structured coaching, timed practice, and clear scholarship targets across local and flagship colleges."
  primaryCtaLabel="Start enrollment"
  primaryCtaHref="/classes"
  secondaryCtaLabel="How it works"
  secondaryCtaHref="/how-it-works"
/>

<div class="grid gap-5 md:grid-cols-3">
  {#each homepageSections as section}
    <PageSection {section} />
  {/each}
</div>
