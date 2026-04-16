<script lang="ts">
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import '../app.css';
  import Analytics from '$lib/components/Analytics.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';

  injectSpeedInsights();
</script>

<Analytics />

<div class="flex min-h-screen flex-col">
  <Nav />
  <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-10">
    <slot />
  </main>
  <Footer />
</div>
