<script lang="ts">
  import { HEAR_ABOUT_US_OPTIONS } from '$lib/content/hearAboutUsOptions';
  import Seo from '$lib/components/Seo.svelte';
  import { SERVICE_AREA } from '$lib/seo';
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<Seo
  title="Contact"
  description="Ask questions about class fit, ACT test dates, pricing, scheduling, and what to expect from the week-before-test format."
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Contact</p>
  <h1 class="mt-2 text-4xl font-black text-ink md:text-5xl">Questions before you enroll?</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Reach out if you want help deciding whether the course is a good fit, which test date to choose,
    or what to expect from the week-before-test format.
  </p>
  <p class="mt-3 max-w-3xl text-sm text-slate-500">
    We respond with details on class fit, scheduling, and next steps for families across the {SERVICE_AREA}.
  </p>
</section>

<form method="POST" class="color-card mt-8 grid gap-4 rounded-3xl border p-6 md:grid-cols-2">
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Full name</span>
    <input name="fullName" class="mt-1 w-full rounded-xl border-sky-100 bg-white" value={form?.values?.fullName ?? ''} required />
  </label>
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Email</span>
    <input name="email" type="email" class="mt-1 w-full rounded-xl border-sky-100 bg-white" value={form?.values?.email ?? ''} required />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Phone (optional)</span>
    <input name="phone" class="mt-1 w-full rounded-xl border-sky-100 bg-white" value={form?.values?.phone ?? ''} />
  </label>
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Student grade</span>
    <input name="studentGrade" placeholder="9, 10, 11, 12" class="mt-1 w-full rounded-xl border-sky-100 bg-white" value={form?.values?.studentGrade ?? ''} />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Student school</span>
    <input
      name="studentSchool"
      list="contact-school-options"
      class="mt-1 w-full rounded-xl border-sky-100 bg-white"
      value={form?.values?.studentSchool ?? ''}
    />
    <datalist id="contact-school-options">
      {#each data.schools as school}
        <option value={school.name}>
          {school.district ? `${school.name} - ${school.district}` : school.name}
        </option>
      {/each}
    </datalist>
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">How did you hear about us?</span>
    <select name="heardAboutUs" class="mt-1 w-full rounded-xl border-sky-100 bg-white">
      <option value="">Select one</option>
      {#each HEAR_ABOUT_US_OPTIONS as option}
        <option value={option} selected={form?.values?.heardAboutUs === option}>{option}</option>
      {/each}
    </select>
  </label>

  <p class="md:col-span-2 text-sm text-slate-500">
    A short message is fine. Tell us your question, student grade, and intended ACT date if you know it.
  </p>

  <label class="block md:col-span-2">
    <span class="text-sm font-semibold text-slate-700">Message</span>
    <textarea name="message" rows="5" class="mt-1 w-full rounded-xl border-sky-100 bg-white" required>{form?.values?.message ?? ''}</textarea>
  </label>

  {#if form?.message}
    <p class={`md:col-span-2 rounded-xl p-3 text-sm ${form?.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'}`}>
      {form.message}
    </p>
  {/if}

  <div class="md:col-span-2 flex justify-end">
    <button class="min-h-11 w-full rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500 sm:w-auto">Send question</button>
  </div>
</form>
