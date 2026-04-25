<script lang="ts">
  import type { CmsSection } from '$lib/types';

  export let section: CmsSection;

  const tones = {
    default: {
      shell: 'border border-slate-200 bg-white/90 shadow-lg shadow-slate-900/5',
      eyebrow: 'text-slate-500',
      title: 'text-ink',
      body: 'text-slate-600',
      cta: 'border border-slate-300 text-slate-700 hover:border-sky hover:text-sky'
    },
    sky: {
      shell:
        'border border-sky-200/80 bg-[linear-gradient(145deg,rgba(236,254,255,0.98),rgba(255,255,255,0.94))] shadow-xl shadow-sky-900/10',
      eyebrow: 'text-sky-700',
      title: 'text-slate-900',
      body: 'text-slate-700',
      cta: 'border border-sky-300/80 bg-white/75 text-sky-900 hover:border-sky-900 hover:bg-sky-900 hover:text-white'
    },
    sun: {
      shell:
        'border border-amber-200/80 bg-[linear-gradient(145deg,rgba(255,247,237,0.98),rgba(255,255,255,0.94))] shadow-xl shadow-amber-900/10',
      eyebrow: 'text-amber-700',
      title: 'text-slate-900',
      body: 'text-slate-700',
      cta: 'border border-amber-300/80 bg-white/75 text-amber-900 hover:border-amber-700 hover:bg-amber-600 hover:text-white'
    },
    ink: {
      shell:
        'border border-slate-800 bg-[linear-gradient(155deg,rgba(15,23,42,1),rgba(30,41,59,0.96))] shadow-xl shadow-slate-950/30',
      eyebrow: 'text-sky-200',
      title: 'text-white',
      body: 'text-slate-200',
      cta: 'border border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-slate-900'
    }
  } as const;

  const tone = section.tone ?? 'default';
  const theme = tones[tone];
</script>

<section class={`rounded-3xl p-6 md:p-8 ${theme.shell}`}>
  {#if section.eyebrow}
    <p class={`text-xs font-bold uppercase tracking-[0.16em] ${theme.eyebrow}`}>{section.eyebrow}</p>
  {/if}
  <h2 class={`mt-2 text-2xl font-black ${theme.title}`}>{section.title}</h2>
  <p class={`mt-3 text-base leading-relaxed ${theme.body}`}>{section.body}</p>
  {#if section.ctaLabel && section.ctaHref}
    <a href={section.ctaHref} class={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${theme.cta}`}>
      {section.ctaLabel}
    </a>
  {/if}
</section>
