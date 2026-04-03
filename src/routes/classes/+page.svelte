<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
</script>

<svelte:head>
  <title>Classes | KC Cram Course</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">ACT Cram Course</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Choose your test date and reserve your seat.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Each ACT Cram Course includes four focused 90-minute sessions in the week before the test. Students get structured strategy,
    pacing practice, and high-yield review designed to improve performance without months of prep.
  </p>

  <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-2xl bg-slate-50 p-4">
      <p class="text-sm font-bold text-ink">What it is</p>
      <p class="mt-1 text-sm text-slate-600">Four-session ACT cram course</p>
    </div>
    <div class="rounded-2xl bg-slate-50 p-4">
      <p class="text-sm font-bold text-ink">When it happens</p>
      <p class="mt-1 text-sm text-slate-600">During the week before your ACT</p>
    </div>
    <div class="rounded-2xl bg-slate-50 p-4">
      <p class="text-sm font-bold text-ink">Who it is for</p>
      <p class="mt-1 text-sm text-slate-600">Students who want to improve their score and increase opportunities</p>
    </div>

  </div>
</section>

<section class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
  {#each data.classes as classOffering}
    <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      {#if classOffering.featured}
        <p class="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
          Ending Soonest
        </p>
      {/if}

      <h2 class="mt-3 text-2xl font-black text-ink">{classOffering.title}</h2>

      <p class="mt-2 text-sm font-semibold text-slate-700">{classOffering.schedule}</p>

      {#if classOffering.location}
        <p class="mt-1 text-sm text-slate-600">{classOffering.location}</p>
      {/if}

      <p class="mt-2 text-sm text-slate-600">{classOffering.format}</p>

      <div class="mt-4 rounded-2xl bg-slate-50 p-4">
        <p class="text-3xl font-black text-sky">
          {money.format(classOffering.priceCents / 100)}
        </p>
        <p class="mt-1 text-xs uppercase tracking-wide text-slate-500">
          {classOffering.seatsAvailable} seats remaining
        </p>
      </div>

      <p class="mt-4 text-sm text-slate-600">
        Your seat is reserved immediately after checkout. Confirmation details are sent by email after enrollment.
      </p>

      <a
        href={`/enroll?class=${classOffering.slug}`}
        class="mt-5 inline-flex rounded-full bg-ink px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
      >
        Reserve your seat
      </a>
    </article>
  {/each}
</section>

<section class="mt-8 rounded-3xl border border-sky-200 bg-sky-50 p-6 shadow-sm shadow-slate-900/5">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Compare value first</p>
      <h2 class="mt-2 text-2xl font-black text-ink">Estimate the scholarship upside before you enroll.</h2>
      <p class="mt-2 text-sm text-slate-700">
        If you are still weighing whether the course is worth it, use the scholarship calculator to see how a score increase can
        change potential merit aid.
      </p>
      <p class="mt-2 text-sm text-slate-600">
        Have questions about paying for prep? Review the
        <a href="/529-update" class="font-semibold text-sky-700 hover:underline"> 529 planning guide</a>.
      </p>
    </div>

    <div class="shrink-0">
      <a
        href="/scholarship-calculator"
        class="inline-flex rounded-full bg-ink px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
      >
        Try the scholarship calculator
      </a>
    </div>
  </div>
</section>
