<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
  title="For Educators"
  description="Get referral-ready information for counselors and teachers, including student fit notes, scheduling support, and counselor packet details."
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">For educators</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">Referral-ready information for counselors and teachers.</h1>
  <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
    Share a concise ACT prep option with families who need a clear plan close to test day.
  </p>
</section>

<section class="mt-8 grid gap-4 md:grid-cols-3">
  <article class="color-card rounded-3xl border p-6">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Program one-pager</p>
    <h2 class="mt-2 text-xl font-black text-ink">Formats and outcomes.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Class formats, outcomes, and parent communication flow.</p>
  </article>

  <article class="warm-card rounded-3xl border p-6">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Student fit notes</p>
    <h2 class="mt-2 text-xl font-black text-ink">Who should enroll.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Ideal entry points by baseline score and timeline.</p>
  </article>

  <article class="rounded-3xl border border-teal-200 bg-white p-6 shadow-lg shadow-teal-900/10">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Scheduling packet</p>
    <h2 class="mt-2 text-xl font-black text-ink">School-specific support.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Test-date alignment and school-specific enrollment link support.</p>
  </article>
</section>

<section class="ink-band mt-8 rounded-3xl border p-6 md:p-8">
  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Counselor packet</p>
      <h2 class="mt-2 text-2xl font-black text-white">Get materials you can send to families.</h2>
    </div>
    <a href="/contact" class="inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-ink transition hover:bg-slate-100">Request counselor packet</a>
  </div>
</section>
