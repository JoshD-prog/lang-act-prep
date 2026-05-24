<script lang="ts">
  import { formatCurrency } from '$lib/scholarships/display';
  import type { TopNearbyOpportunity } from '$lib/scholarships/display';

  export let matchedSchoolCount = 0;
  export let topNearbyOpportunities: TopNearbyOpportunity[] = [];

  $: strongestOpportunity = topNearbyOpportunities[0];
</script>

<div class="rounded-[2rem] border border-slate-800 bg-slate-950 px-6 py-6 text-white shadow-xl shadow-slate-900/10">
  <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">Scholarship outlook</p>
  <div class="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
    <div>
      <h2 class="text-2xl font-black">See where your student stands and where the biggest savings may still be available.</h2>
      <p class="mt-2 max-w-3xl text-sm text-sky-100/90">
        Each result shows what your student already qualifies for, what the next scholarship move looks like, and where stronger scores could still lower the total college cost.
      </p>
    </div>
    <div class="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
      {matchedSchoolCount} school{matchedSchoolCount === 1 ? '' : 's'} matched
    </div>
  </div>

  {#if topNearbyOpportunities.length > 0}
    <div class="mt-5 border-t border-white/10 pt-5">
      <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Clearest action point</p>
        <p class="mt-2 max-w-3xl text-lg font-black text-white">
          {strongestOpportunity.schoolName}: +{strongestOpportunity.actGap} ACT point{strongestOpportunity.actGap === 1 ? '' : 's'}
          could unlock {formatCurrency(strongestOpportunity.additionalFourYearValue)} over 4 years.
        </p>
        <p class="mt-2 text-sm text-sky-100/90">
          Use this as the first scholarship target to compare before setting a prep goal.
        </p>
      </div>

      <p class="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Strongest nearby value opportunities</p>
      <div class="mt-3 grid gap-3 lg:grid-cols-3">
        {#each topNearbyOpportunities as opportunity}
          <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
            <p class="text-sm font-bold text-white">{opportunity.schoolName}</p>
            <p class="mt-1 text-xs text-sky-100">
              +{opportunity.actGap} ACT point{opportunity.actGap === 1 ? '' : 's'} toward {opportunity.tierName}
            </p>
            <p class="mt-2 text-lg font-black text-white">
              +{formatCurrency(opportunity.additionalFourYearValue)}
            </p>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
