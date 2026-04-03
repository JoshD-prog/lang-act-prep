<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<Seo
  title="Enrollment Complete"
  description="Enrollment status and payment confirmation for your recent KC Cram Course checkout."
  robots="noindex, nofollow"
/>

<section class="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
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
      Payment received. Finalizing enrollment.
    {:else}
      We couldn't confirm payment yet.
    {/if}
  </h1>

  <p class="mt-4 text-lg text-slate-600">
    {#if data.paymentReceived && data.webhookRecorded}
      {data.classTitle ? `${data.classTitle} is confirmed.` : 'Your enrollment is confirmed.'}
      You will receive an email with course details and next steps.
    {:else if data.paymentReceived}
      Stripe shows the payment succeeded, but the site is still waiting for the webhook to finish recording the enrollment.
      Refresh this page in a few seconds to confirm the full flow completed.
    {:else if data.sessionFound}
      Stripe returned to the site, but this page does not show a paid checkout session yet.
      If you just completed payment, wait a moment and refresh. Otherwise, return to classes and try again.
    {:else}
      This page needs a valid Stripe session to confirm enrollment.
    {/if}
  </p>

  {#if data.sessionId}
    <p class="mt-3 text-sm text-slate-500">
      Session ID: <span class="font-mono">{data.sessionId}</span>
    </p>
  {/if}

  {#if data.parentEmail}
    <p class="mt-2 text-sm text-slate-500">
      Receipt email: <span class="font-medium text-slate-700">{data.parentEmail}</span>
    </p>
  {/if}

  <a
    href="/classes"
    class="mt-6 inline-flex rounded-full bg-sky px-6 py-3 text-sm font-bold text-white"
  >
    Back to classes
  </a>
</section>
