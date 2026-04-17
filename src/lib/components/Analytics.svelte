<script lang="ts">
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { initAnalytics, rememberMarketingParams, trackPageView } from '$lib/analytics';

  onMount(() => {
    initAnalytics();
    rememberMarketingParams(window.location);
    trackPageView(window.location);
  });

  if (browser) {
    afterNavigate(({ to }) => {
      if (!to) {
        return;
      }

      rememberMarketingParams(to.url);
      trackPageView(to.url);
    });
  }
</script>
