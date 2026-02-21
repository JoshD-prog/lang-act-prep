<script lang="ts">
  import type { CmsSection } from '$lib/types';

  export let section: CmsSection;
</script>

<section class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/5 md:p-8">
  {#if section.eyebrow}
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{section.eyebrow}</p>
  {/if}
  <h2 class="mt-2 text-2xl font-black text-ink">{section.title}</h2>
  <p class="mt-3 text-base leading-relaxed text-slate-600">{section.body}</p>
  {#if section.ctaLabel && section.ctaHref}
    <a href={section.ctaHref} class="mt-5 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-sky hover:text-sky">
      {section.ctaLabel}
    </a>
  {/if}
</section>
