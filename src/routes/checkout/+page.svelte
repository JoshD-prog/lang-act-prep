<script lang="ts">
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
  <title>Checkout | KC Cram Course</title>
</svelte:head>

{#if !data.stripeReady}
  <section class="mx-auto mb-4 max-w-3xl rounded-2xl border border-amber-300 bg-amber-50 p-4">
    <p class="text-sm font-semibold text-amber-900">
      Not ready yet: Checkout is temporarily unavailable while Stripe setup is being completed.
    </p>
  </section>
{/if}

<section class="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Enrollment Checkout</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Complete your enrollment.</h1>
  <p class="mt-4 text-slate-600">
    Review your course details and continue to secure checkout through Stripe.
  </p>

  <form method="POST" class="mt-6 grid gap-5">
    <input type="hidden" name="classSlug" value={data.classSlug} />
    <input type="hidden" name="leadId" value={data.leadId} />

    <!-- UPDATED SUMMARY BLOCK -->
    <div class="rounded-2xl bg-slate-50 p-6 text-sm text-slate-700">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        Enrollment Summary
      </p>

      <p class="mt-2 text-lg font-semibold text-slate-900">
        {data.classTitle || 'Not selected'}
      </p>

      <div class="mt-4 space-y-1 text-slate-700">
        {#if data.classSchedule}
          <p>
            <span class="font-semibold">Dates & Time:</span>
            {data.classSchedule}
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
    </div>

    <label>
      <span class="text-sm font-semibold text-slate-700">Parent email for receipt</span>
      <input
        name="email"
        type="email"
        required
        value={data.email}
        class="mt-1 w-full rounded-xl border-slate-300"
      />
    </label>

    {#if form?.message}
      <p class="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{form.message}</p>
    {/if}

    <button
      class={`rounded-full px-6 py-3 text-sm font-bold text-white ${data.stripeReady ? 'bg-sky' : 'cursor-not-allowed bg-slate-400'}`}
      disabled={!data.stripeReady}
    >
      Continue to Secure Checkout
    </button>

    <p class="text-xs text-slate-500">
      You’ll review payment details on Stripe before the charge is completed.
    </p>
  </form>
</section>