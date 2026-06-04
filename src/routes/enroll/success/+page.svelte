<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
  title="Enrollment Complete"
  description="Enrollment has been completed and a confirmation email with next steps is on the way."
  robots="noindex, nofollow"
/>

<section class="page-hero mx-auto max-w-3xl p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
    Enrollment complete
  </p>

  <h1 class="mt-2 text-4xl font-black text-ink">
    You're enrolled.
  </h1>

  <p class="mt-4 text-lg text-slate-600">
    Your payment has been received. You will receive an email with course details and next steps.
  </p>

  <a
    href="/classes"
    class="mt-6 inline-flex rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500"
  >
    Back to classes
  </a>
</section>
