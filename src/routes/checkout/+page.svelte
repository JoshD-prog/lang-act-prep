<script lang="ts">
  import { onMount } from 'svelte';
  import { preserveMarketingParams, trackEvent, trackMetaEvent } from '$lib/analytics';
  import { getClassScheduleDetails } from '$lib/content/classSchedule';
  import { getEarlyBirdOffer } from '$lib/content/earlyBird';
  import Seo from '$lib/components/Seo.svelte';
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
  const earlyBirdOffer = $derived(getEarlyBirdOffer(data.classSlug));
  const scheduleDetails = $derived(
    getClassScheduleDetails({
      slug: data.classSlug,
      schedule: data.classSchedule
    })
  );

  onMount(() => {
    trackEvent('checkout_visit', {
      class_slug: data.classSlug,
      lead_id: data.leadId || undefined
    });

    trackMetaEvent('InitiateCheckout', {
      content_name: data.classTitle || undefined,
      content_ids: data.classSlug ? [data.classSlug] : undefined
    });
  });
</script>

<Seo
  title="Checkout"
  description="Review your ACT course details and continue to secure Stripe checkout to finalize enrollment."
  robots="noindex, nofollow"
/>

{#if !data.stripeReady}
  <section class="mx-auto mb-4 max-w-3xl rounded-2xl border border-amber-300 bg-amber-50 p-4">
    <p class="text-sm font-semibold text-amber-900">
      Checkout is temporarily unavailable. Please contact us and we can help finish your enrollment.
    </p>
  </section>
{/if}

<section class="page-hero mx-auto max-w-3xl p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Enrollment Checkout</p>
  <h1 class="mt-2 text-4xl font-black text-ink md:text-5xl">Complete your enrollment.</h1>
  <p class="mt-4 text-slate-600">
    Review your course details and continue to secure checkout through Stripe.
  </p>

  <form method="POST" use:preserveMarketingParams={data.marketingParams} class="mt-6 grid gap-5">
    <input type="hidden" name="classSlug" value={data.classSlug} />
    <input type="hidden" name="leadId" value={data.leadId} />
    <input type="hidden" name="highSchoolSlug" value={data.highSchoolSlug} />
    <input type="hidden" name="heardAboutUs" value={data.heardAboutUs} />
    {#each Object.entries(data.marketingParams) as [key, value]}
      <input type="hidden" name={key} value={value} />
    {/each}

    <!-- UPDATED SUMMARY BLOCK -->
    <div class="rounded-2xl border border-sky-100 bg-white/85 p-6 text-sm text-slate-700 shadow-sm">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
        Enrollment Summary
      </p>

      <p class="mt-2 text-lg font-semibold text-slate-900">
        {data.classTitle || 'Not selected'}
      </p>

      <div class="mt-4 space-y-1 text-slate-700">
        {#if scheduleDetails.dateLabel}
          <p>
            <span class="font-semibold">Dates:</span>
            {scheduleDetails.dateLabel}
          </p>
        {/if}

        {#if scheduleDetails.hasTime}
          <p>
            <span class="font-semibold">Time:</span>
            {scheduleDetails.timeLabel}
          </p>
        {/if}

        {#if scheduleDetails.cadenceLabel}
          <p>
            <span class="font-semibold">Schedule:</span>
            {scheduleDetails.cadenceLabel}
          </p>
        {/if}

        {#if data.classLocation}
          <p>
            <span class="font-semibold">Location:</span>
            {data.classLocation}
          </p>
        {/if}

        {#if data.classFormat}
          <p>
            <span class="font-semibold">Format:</span>
            {data.classFormat}
          </p>
        {/if}
      </div>

      <p class="mt-4 text-sm text-slate-600">
        Your seat will be reserved once payment is completed. Full course details will be emailed immediately after checkout.
      </p>

      {#if earlyBirdOffer}
        <div class="mt-4 rounded-xl border border-emerald-200 bg-white p-4 text-sm text-emerald-900">
          <p class="font-semibold">
            {earlyBirdOffer.discountedPriceLabel} with code {earlyBirdOffer.code}
          </p>
          <p class="mt-1 text-emerald-800">
            {earlyBirdOffer.deadlineLabel}
          </p>
          <p class="mt-1 font-medium text-emerald-900">
            {earlyBirdOffer.urgencyLabel}
          </p>
        </div>
      {/if}
    </div>

    <label>
      <span class="text-sm font-semibold text-slate-700">Parent email for receipt</span>
      <input
        name="email"
        type="email"
        required
        value={data.email}
        class="mt-1 w-full rounded-xl border-sky-100 bg-white"
      />
    </label>

    {#if form?.message}
      <p class="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{form.message}</p>
    {/if}

        <button
      class={`rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition ${data.stripeReady ? 'bg-sky shadow-sky-900/20 hover:bg-teal-500' : 'cursor-not-allowed bg-slate-400 shadow-slate-900/10'}`}
      disabled={!data.stripeReady}
    >
      Continue to Secure Checkout
    </button>

    <p class="text-xs text-slate-500">
      By continuing, you agree to the
      <a href="/terms-and-conditions" class="underline hover:no-underline">
        Terms &amp; Conditions
      </a>.
    </p>

    <p class="text-xs text-slate-500">
      You’ll review payment details on Stripe before the charge is completed.
    </p>
  </form>
</section>
