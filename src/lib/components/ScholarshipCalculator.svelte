<script lang="ts">
  import type { ScholarshipProjection } from '$lib/types';

  export let projections: ScholarshipProjection[] = [];
  export let gpa = 0;
  export let act = 0;

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
</script>

<section class="grid gap-4">
  {#if projections.length === 0}
    <p class="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm text-slate-600">
      Enter GPA and ACT score to estimate scholarships.
    </p>
  {/if}

  {#each projections as projection}
    <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      <h3 class="text-xl font-extrabold text-ink">{projection.collegeName}</h3>
      {#if projection.qualifiedTier}
        <p class="mt-3 rounded-xl bg-teal-50 px-3 py-2 text-sm text-teal-800">
          Current estimate for GPA {gpa.toFixed(2)} and ACT {act}: <strong>{projection.qualifiedTier.tierName}</strong>
          ({money.format(projection.qualifiedTier.annualAwardUsd)}/year).
        </p>
      {:else}
        <p class="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">
          No current tier match, but you are close. See next target thresholds below.
        </p>
      {/if}

      {#if projection.nextTiers.length > 0}
        <h4 class="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Next tiers</h4>
        <ul class="mt-2 space-y-2">
          {#each projection.nextTiers as tier}
            <li class="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <strong>{tier.tierName}</strong>: GPA {tier.minGpa.toFixed(2)} / ACT {tier.minAct} (
              {money.format(tier.annualAwardUsd)}/year)
            </li>
          {/each}
        </ul>
      {/if}
    </article>
  {/each}
</section>
