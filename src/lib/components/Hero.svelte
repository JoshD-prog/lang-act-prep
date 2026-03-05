<script lang="ts">
  export let eyebrow = '';
  export let title = '';
  export let body = '';
  export let primaryCtaLabel = 'Enroll now';
  export let primaryCtaHref = '/enroll';
  export let secondaryCtaLabel = 'View classes';
  export let secondaryCtaHref = '/classes';
</script>

<section class="mx-auto max-w-6xl px-4 pb-10 pt-8 md:px-6 md:pb-14 md:pt-10">
  <div class="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
    <div>
      <p class="mb-3 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
        {eyebrow}
      </p>
      <h1 class="text-balance text-5xl font-black leading-tight text-ink md:text-6xl">{title}</h1>
      <p class="mt-5 max-w-2xl text-pretty text-xl leading-relaxed text-slate-600">{body}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href={primaryCtaHref} class="rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:bg-teal-500">
          {primaryCtaLabel}
        </a>
        <a href={secondaryCtaHref} class="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-sky hover:text-sky">
          {secondaryCtaLabel}
        </a>
      </div>
    </div>
    <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-clay">Course Format</p>
      <h2 class="mt-3 text-2xl font-extrabold text-ink">ACT Cram Course</h2>
      <ul class="mt-4 space-y-3 text-base text-slate-700">
        <li class="rounded-2xl bg-slate-50 px-4 py-3">4 focused 90-minute sessions.</li>
        <li class="rounded-2xl bg-slate-50 px-4 py-3">Strategy, pacing, and high-yield review.</li>
        <li class="rounded-2xl bg-slate-50 px-4 py-3">Built for the week before your ACT.</li>
      </ul>
    </div>
  </div>
</section>
