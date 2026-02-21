<script lang="ts">
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
  <title>Enroll | ACT Prep Classes</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Enrollment</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Secure your spot in the next cohort.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Complete this form to lock class preference and proceed to secure payment.
  </p>
</section>

<form method="POST" class="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-2">
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Student name</span>
    <input name="studentName" class="mt-1 w-full rounded-xl border-slate-300" required />
  </label>
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Parent email</span>
    <input name="parentEmail" type="email" class="mt-1 w-full rounded-xl border-slate-300" required />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Class</span>
    <select name="classSlug" class="mt-1 w-full rounded-xl border-slate-300" required>
      <option value="" disabled selected={data.selectedClass === ''}>Select class</option>
      {#each data.classes as classOffering}
        <option value={classOffering.slug} selected={classOffering.slug === data.selectedClass}>
          {classOffering.title} ({classOffering.schedule})
        </option>
      {/each}
    </select>
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">School (optional)</span>
    <select name="schoolSlug" class="mt-1 w-full rounded-xl border-slate-300">
      <option value="" selected={data.selectedSchool === ''}>General enrollment</option>
      {#each data.schools as school}
        <option value={school.slug} selected={school.slug === data.selectedSchool}>{school.name}</option>
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
    ></textarea>
  </label>

  {#if form?.message}
    <p class="md:col-span-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{form.message}</p>
  {/if}

  <div class="md:col-span-2 flex justify-end">
    <button class="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">Continue to checkout</button>
  </div>
</form>
