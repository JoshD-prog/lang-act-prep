<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
  title="Payment Cancelled"
  description="Your payment was not completed. Return to class options whenever you are ready to continue enrollment."
  robots="noindex, nofollow"
/>

<section class="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
    Payment cancelled
  </p>

  <h1 class="mt-2 text-4xl font-black text-ink">
    Your payment was not completed.
  </h1>

  <p class="mt-4 text-lg text-slate-600">
    You can return and complete enrollment whenever you're ready.
  </p>

  <a
    href="/classes"
    class="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
  >
    Return to classes
  </a>
</section>
