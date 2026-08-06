<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
  title="For Educators"
  description="Review the KC Cram Course schedule, student fit, and materials available for counselors and teachers to share with families."
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">For educators</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">ACT course information for counselors and teachers</h1>
  <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
    KC Cram Course meets Monday through Thursday during the week before each ACT. The information below can help you
    decide which students to refer and what to send their families.
  </p>
</section>

<section class="mt-8 grid gap-4 md:grid-cols-3">
  <article class="color-card rounded-3xl border p-6">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Course summary</p>
    <h2 class="mt-2 text-xl font-black text-ink">Four classes during ACT week</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Each class lasts 90 minutes and covers real ACT questions, timing, and common mistakes.</p>
  </article>

  <article class="warm-card rounded-3xl border p-6">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Student fit notes</p>
    <h2 class="mt-2 text-xl font-black text-ink">Who is a good fit</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Students who understand most of the material but lose points to timing, misreading, or inconsistent methods.</p>
  </article>

  <article class="rounded-3xl border border-teal-200 bg-white p-6 shadow-lg shadow-teal-900/10">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Family information</p>
    <h2 class="mt-2 text-xl font-black text-ink">Dates, locations, and enrollment</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Families can choose the course matching their ACT date and complete enrollment online.</p>
  </article>
</section>

<section class="ink-band mt-8 rounded-3xl border p-6 md:p-8">
  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Counselor packet</p>
      <h2 class="mt-2 text-2xl font-black text-white">Get materials you can send to families.</h2>
    </div>
    <a href="/contact" class="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-bold text-ink transition hover:bg-slate-100 sm:w-auto">Request counselor packet</a>
  </div>
</section>
