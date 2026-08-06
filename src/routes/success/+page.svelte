<script lang="ts">
  import { onMount } from 'svelte';
  import {
    markEventOnce,
    trackEvent,
    trackGoogleAdsConversion,
    trackMetaPurchase
  } from '$lib/analytics';
  import Seo from '$lib/components/Seo.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  onMount(() => {
    if (!data.paymentReceived || !data.sessionId) {
      return;
    }

    if (!markEventOnce(`purchase_complete:${data.sessionId}`)) {
      return;
    }

    trackEvent('purchase_complete', {
      session_id: data.sessionId,
      class_title: data.classTitle || undefined
    });

    trackGoogleAdsConversion({
      transactionId: data.sessionId,
      value: data.paymentAmount,
      currency: data.currency || undefined
    });

    trackMetaPurchase({
      transactionId: data.sessionId,
      value: data.paymentAmount,
      currency: data.currency || undefined
    });
  });
</script>

<Seo
  title="Enrollment Complete"
  description="Enrollment status and payment confirmation for your recent KC Cram Course checkout."
  robots="noindex, nofollow"
/>

<section class="page-hero mx-auto max-w-3xl p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
    {#if data.paymentReceived}
      Payment received
    {:else}
      Enrollment update
    {/if}
  </p>

  <h1 class="mt-2 text-4xl font-black text-ink">
    {#if data.paymentReceived && data.webhookRecorded}
      You're enrolled.
    {:else if data.paymentReceived}
      Payment received. We are confirming your enrollment.
    {:else}
      We couldn't confirm payment yet.
    {/if}
  </h1>

  <p class="mt-4 text-lg text-slate-600">
    {#if data.paymentReceived && data.webhookRecorded}
      {data.classTitle ? `${data.classTitle} is confirmed.` : 'Your enrollment is confirmed.'}
      You will receive an email with the class dates, time, and location.
    {:else if data.paymentReceived}
      Your payment went through. Refresh this page in a few seconds. Contact me if you do not receive a course email soon.
    {:else if data.sessionFound}
      We found your checkout, but payment has not been confirmed yet.
      If you just completed payment, wait a moment and refresh. Otherwise, return to classes and try again.
    {:else}
      We could not find a checkout to confirm. Return to classes to restart enrollment, or contact us for help.
    {/if}
  </p>

  {#if data.sessionId}
    <p class="mt-3 text-sm text-slate-500">
      Checkout reference: <span class="font-mono">{data.sessionId}</span>
    </p>
  {/if}

  {#if data.parentEmail}
    <p class="mt-2 text-sm text-slate-500">
      Receipt email: <span class="font-medium text-slate-700">{data.parentEmail}</span>
    </p>
  {/if}

  <a
    href="/classes"
    class="mt-6 inline-flex rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500"
  >
    Back to classes
  </a>
</section>
