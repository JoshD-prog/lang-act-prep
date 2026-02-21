<script lang="ts">
  export let eyebrow = '';
  export let title = '';
  export let body = '';
  export let primaryCtaLabel = 'Enroll now';
  export let primaryCtaHref = '/enroll';
  export let secondaryCtaLabel = 'View classes';
  export let secondaryCtaHref = '/classes';
</script>

<section class="mx-auto max-w-6xl px-4 pb-14 pt-12 md:px-6 md:pb-20 md:pt-16">
  <div class="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
    <div>
      <p class="mb-3 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
        {eyebrow}
      </p>
      <h1 class="text-balance text-4xl font-black leading-tight text-ink md:text-5xl">{title}</h1>
      <p class="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600">{body}</p>
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
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-clay">Current focus</p>
      <h2 class="mt-3 text-2xl font-extrabold text-ink">Spring and Summer Cohorts</h2>
      <ul class="mt-4 space-y-3 text-sm text-slate-700">
        <li class="rounded-2xl bg-slate-50 px-4 py-3">Diagnostic exam and custom target plan in week 1.</li>
        <li class="rounded-2xl bg-slate-50 px-4 py-3">Weekly timed sections with pacing diagnostics.</li>
        <li class="rounded-2xl bg-slate-50 px-4 py-3">Parent score updates and scholarship path checkpoints.</li>
      </ul>
    </div>
  </div>
</section>
