<script lang="ts">
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>Contact | ACT Prep Classes</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Contact us</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Request more information.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Tell us what you want to learn more about and we will follow up with details on class fit,
    schedules, and next steps.
  </p>
</section>

<form method="POST" class="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-2">
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Full name</span>
    <input name="fullName" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.fullName ?? ''} required />
  </label>
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Email</span>
    <input name="email" type="email" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.email ?? ''} required />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Phone (optional)</span>
    <input name="phone" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.phone ?? ''} />
  </label>
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Student grade (optional)</span>
    <input name="studentGrade" placeholder="9, 10, 11, 12" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.studentGrade ?? ''} />
  </label>

  <label class="block">
    <span class="text-sm font-semibold text-slate-700">Student school (optional)</span>
    <input name="studentSchool" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.studentSchool ?? ''} />
  </label>
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">What are you interested in? (optional)</span>
    <select name="interest" class="mt-1 w-full rounded-xl border-slate-300">
      <option value="" selected={(form?.values?.interest ?? '') === ''}>Select one</option>
      <option value="class-options" selected={form?.values?.interest === 'class-options'}>Class options</option>
      <option value="pricing" selected={form?.values?.interest === 'pricing'}>Pricing</option>
      <option value="school-specific-enrollment" selected={form?.values?.interest === 'school-specific-enrollment'}>School-specific enrollment</option>
      <option value="scholarship-planning" selected={form?.values?.interest === 'scholarship-planning'}>Scholarship planning</option>
      <option value="schedule-fit" selected={form?.values?.interest === 'schedule-fit'}>Schedule fit</option>
    </select>
  </label>

  <label class="block md:col-span-2">
    <span class="text-sm font-semibold text-slate-700">Message</span>
    <textarea name="message" rows="5" class="mt-1 w-full rounded-xl border-slate-300" required>{form?.values?.message ?? ''}</textarea>
  </label>

  {#if form?.message}
    <p class={`md:col-span-2 rounded-xl p-3 text-sm ${form?.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'}`}>
      {form.message}
    </p>
  {/if}

  <div class="md:col-span-2 flex justify-end">
    <button class="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">Send message</button>
  </div>
</form>
