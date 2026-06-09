<script lang="ts">
  import { preserveMarketingParams } from '$lib/analytics';
  import { getClassScheduleDetails } from '$lib/content/classSchedule';
  import { getEarlyBirdOffer } from '$lib/content/earlyBird';
  import { HEAR_ABOUT_US_OPTIONS } from '$lib/content/hearAboutUsOptions';
  import Seo from '$lib/components/Seo.svelte';
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let studentName = $state('');
  let parentEmail = $state('');
  let selectedClass = $state('');
  let schoolName = $state('');
  let selectedSchoolSlug = $state('');
  let schoolInitialized = $state(false);
  let contactInitialized = $state(false);

  $effect(() => {
    if (!contactInitialized) {
      studentName = form?.studentName ?? '';
      parentEmail = form?.parentEmail ?? '';
      contactInitialized = true;
    }
  });

  $effect(() => {
    if (!selectedClass) {
      selectedClass = form?.classSlug ?? data.selectedClass ?? '';
    }
  });

  const selectedSchool = $derived(
    data.schools.find((school) => school.slug === (form?.schoolSlug ?? data.selectedSchool))
  );

  $effect(() => {
    if (!schoolInitialized) {
      schoolName = form?.schoolName ?? selectedSchool?.name ?? '';
      selectedSchoolSlug = form?.schoolSlug ?? data.selectedSchool ?? '';
      schoolInitialized = true;
    }
  });

  function syncSchoolSelection(event?: Event) {
    const currentSchoolName =
      event?.currentTarget instanceof HTMLInputElement ? event.currentTarget.value : schoolName;
    const normalizedSchoolName = currentSchoolName.trim().toLowerCase();
    const exactMatch = data.schools.find(
      (school) => school.name.toLowerCase() === normalizedSchoolName
    );

    selectedSchoolSlug = exactMatch?.slug ?? '';
  }

  const selectedClassOffering = $derived(
    data.classes.find((classOffering) => classOffering.slug === selectedClass)
  );
  const selectedScheduleDetails = $derived(
    selectedClassOffering ? getClassScheduleDetails(selectedClassOffering) : null
  );
  const earlyBirdOffer = $derived(
    selectedClassOffering ? getEarlyBirdOffer(selectedClassOffering.slug) : null
  );
</script>

<Seo
  title="Enroll"
  description="Choose your ACT prep class, confirm student details, and continue to checkout to reserve your seat."
  robots="noindex, nofollow"
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Enrollment</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">Secure your spot in the next cohort.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Select your class, confirm the schedule and location, and enter your student and parent information to continue to checkout.
  </p>
</section>

{#if selectedClassOffering}
  <div class="mt-6 flex justify-center">
    <div class="warm-card w-full max-w-xl rounded-2xl border p-6 text-sm text-slate-700">
      <p class="text-center text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Selected Class</p>

      <p class="mt-2 text-center text-base font-semibold text-slate-900">
        {selectedClassOffering.title}
      </p>

      <div class="mt-3 space-y-1 text-center">
        {#if selectedScheduleDetails?.dateLabel}
          <p class="text-slate-600">{selectedScheduleDetails.dateLabel}</p>
        {/if}

        {#if selectedScheduleDetails?.hasTime}
          <p class="font-semibold text-sky-800">Time: {selectedScheduleDetails.timeLabel}</p>
        {/if}

        {#if selectedScheduleDetails?.cadenceLabel}
          <p class="text-slate-600">{selectedScheduleDetails.cadenceLabel}</p>
        {/if}

        {#if selectedClassOffering.location}
          <p class="text-slate-600">{selectedClassOffering.location}</p>
        {/if}

        <p class="text-slate-600">{selectedClassOffering.format}</p>
      </div>

      <p class="mt-3 text-center text-xs uppercase tracking-wide text-slate-500">
        {selectedClassOffering.seatsAvailable} seats remaining
      </p>

      {#if earlyBirdOffer}
        <div class="mt-4 rounded-xl border border-emerald-200 bg-white p-4 text-left text-sm text-emerald-900">
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
  </div>
{/if}

<form
  method="POST"
  use:preserveMarketingParams={data.marketingParams}
  class="color-card mt-8 grid gap-4 rounded-3xl border p-6 md:grid-cols-2"
>
  {#each Object.entries(data.marketingParams) as [key, value]}
    <input type="hidden" name={key} value={value} />
  {/each}
  <input type="hidden" name="highSchoolSlug" value={selectedSchoolSlug} />

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Student name</span>
    <input
      name="studentName"
      bind:value={studentName}
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
      required
    />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Parent email</span>
    <input
      name="parentEmail"
      type="email"
      bind:value={parentEmail}
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
      required
    />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Student school</span>
    <input
      name="schoolName"
      list="school-options"
      bind:value={schoolName}
      oninput={syncSchoolSelection}
      onchange={syncSchoolSelection}
      placeholder="Start typing a school name"
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
    />
    <datalist id="school-options">
      {#each data.schools as school}
        <option value={school.name}>
          {school.district ? `${school.name} - ${school.district}` : school.name}
        </option>
      {/each}
    </datalist>
    <p class="mt-1 text-xs text-slate-500">
      Choose a matching school or type your school manually.
    </p>
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">How did you hear about us?</span>
    <select name="heardAboutUs" class="mt-1 w-full rounded-xl border-sky-100 bg-white">
      <option value="">Select one</option>
      {#each HEAR_ABOUT_US_OPTIONS as option}
        <option value={option} selected={form?.heardAboutUs === option}>{option}</option>
      {/each}
    </select>
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Class</span>
    <select
      name="classSlug"
      bind:value={selectedClass}
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
      required
    >
      <option value="" disabled>Select class</option>
      {#each data.classes as classOffering}
        {@const scheduleDetails = getClassScheduleDetails(classOffering)}
        <option value={classOffering.slug}>
          {classOffering.title} - {scheduleDetails.optionLabel}
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
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
    >{form?.notes ?? ''}</textarea>
  </label>

  {#if form?.message}
    <p class="md:col-span-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{form.message}</p>
  {/if}

  <div class="md:col-span-2">
    <div class="rounded-2xl border border-sky-100 bg-white/85 p-4">
      <p class="text-sm font-semibold text-slate-800">
        Checkout is handled securely through Stripe.
      </p>
      <p class="mt-1 text-sm text-slate-600">
        Your seat is reserved after payment is complete, and confirmation details are sent by email.
      </p>
      <p class="mt-2 text-xs text-slate-500">
        By continuing, you agree to the
        <a href="/terms-and-conditions" class="underline hover:no-underline">
          Terms &amp; Conditions
        </a>.
      </p>
    </div>
  </div>

  <div class="md:col-span-2 flex justify-end">
    <button class="rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500">
      Continue to checkout
    </button>
  </div>
</form>
