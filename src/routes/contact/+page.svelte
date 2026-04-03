<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<Seo
  title="Contact"
  description="Ask questions about class fit, ACT test dates, pricing, scheduling, and what to expect from the week-before-test format."
/>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Contact</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Questions before you enroll?</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Reach out if you want help deciding whether the course is a good fit, which test date to choose,
    or what to expect from the week-before-test format.
  </p>
  <p class="mt-3 max-w-3xl text-sm text-slate-500">
    We respond with details on class fit, scheduling, and next steps.
  </p>
</section>

<form method="POST" class="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 md:grid-cols-2">
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

  <p class="md:col-span-2 text-sm text-slate-500">
    A short message is fine. Tell us your question, student grade, and intended ACT date if you know it.
  </p>

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
    <button class="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">Send question</button>
  </div>
</form>
