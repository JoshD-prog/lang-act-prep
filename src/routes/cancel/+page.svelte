<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
  title="Payment Cancelled"
  description="Your payment was not completed. Return to class options whenever you are ready to continue enrollment."
  robots="noindex, nofollow"
/>

<section class="page-hero mx-auto max-w-3xl p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
    Payment cancelled
  </p>

  <h1 class="mt-2 text-4xl font-black text-ink">
    Your payment was not completed.
  </h1>

  <p class="mt-4 text-lg text-slate-600">
    You can return to checkout and complete enrollment whenever you're ready.
  </p>

  <a
    href="/classes"
    class="mt-6 inline-flex rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/20 transition hover:bg-teal-500"
  >
    Return to classes
  </a>
</section>
