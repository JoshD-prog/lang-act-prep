<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let selectedClass = $state('');

  $effect(() => {
    if (!selectedClass) {
      selectedClass = form?.classSlug ?? data.selectedClass ?? '';
    }
  });

  const selectedClassOffering = $derived(
    data.classes.find((classOffering) => classOffering.slug === selectedClass)
  );
</script>

<Seo
  title="Enroll"
  description="Choose your ACT prep class, confirm student details, and continue to checkout to reserve your seat."
  robots="noindex, nofollow"
/>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Enrollment</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Secure your spot in the next cohort.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Select your class, confirm the schedule and location, and enter your student and parent information to continue to checkout.
  </p>
</section>

{#if selectedClassOffering}
  <div class="mt-6 flex justify-center">
    <div class="w-full max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 shadow-sm">
      <p class="text-center text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Selected Class</p>

      <p class="mt-2 text-center text-base font-semibold text-slate-900">
        {selectedClassOffering.title}
      </p>

      <div class="mt-3 space-y-1 text-center">
        <p class="text-slate-600">{selectedClassOffering.schedule}</p>

        {#if selectedClassOffering.location}
          <p class="text-slate-600">{selectedClassOffering.location}</p>
        {/if}

        <p class="text-slate-600">{selectedClassOffering.format}</p>
      </div>

      <p class="mt-3 text-center text-xs uppercase tracking-wide text-slate-500">
        {selectedClassOffering.seatsAvailable} seats remaining
      </p>
    </div>
  </div>
{/if}

<form method="POST" class="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-2">
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Student name</span>
    <input
      name="studentName"
      value={form?.studentName ?? ''}
      class="mt-1 w-full rounded-xl border-slate-300"
      required
    />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Parent email</span>
    <input
      name="parentEmail"
      type="email"
      value={form?.parentEmail ?? ''}
      class="mt-1 w-full rounded-xl border-slate-300"
      required
    />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Class</span>
    <select
      name="classSlug"
      bind:value={selectedClass}
      class="mt-1 w-full rounded-xl border-slate-300"
      required
    >
      <option value="" disabled>Select class</option>
      {#each data.classes as classOffering}
        <option value={classOffering.slug}>
          {classOffering.title} — {classOffering.schedule}
        </option>
      {/each}
    </select>
  </label>

  <label class="block md:col-span-2">
    <span class="text-sm font-semibold text-slate-700">Notes (optional)</span>
    <textarea
      name="notes"
      rows="4"
      placeholder="Share timeline, target score, or scheduling constraints"
      class="mt-1 w-full rounded-xl border-slate-300"
    >{form?.notes ?? ''}</textarea>
  </label>

  {#if form?.message}
    <p class="md:col-span-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{form.message}</p>
  {/if}

  <div class="md:col-span-2">
    <p class="text-xs text-slate-500">
      By continuing, you agree to the
      <a href="/terms-and-conditions" class="underline hover:no-underline">
        Terms &amp; Conditions
      </a>.
    </p>
  </div>

  <div class="md:col-span-2 flex justify-end">
    <button class="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
      Continue to checkout
    </button>
  </div>
</form>
