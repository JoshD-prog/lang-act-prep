<script lang="ts">
  import type { School } from '$lib/types';

  export let schools: School[] = [];
</script>

<section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {#each schools as school}
    <a
      href={`/schools/${school.slug}`}
      class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img src={school.heroImageUrl} alt={school.name} class="h-44 w-full object-cover" loading="lazy" />
      <div class="p-5">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{school.district ?? 'School partner'}</p>
        <h3 class="mt-1 text-xl font-black text-ink transition group-hover:text-sky">{school.name}</h3>
        <p class="mt-2 text-sm text-slate-600">{school.shortPitch}</p>
        <p class="mt-4 text-sm font-bold text-sky">View enrollment page</p>
      </div>
    </a>
  {/each}
</section>
