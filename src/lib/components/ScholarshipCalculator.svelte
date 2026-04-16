<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import type { ScholarshipNextStep, ScholarshipProjectionResult } from '$lib/types';

  export let projections: ScholarshipProjectionResult[] = [];
  export let hasSearched = false;

  function formatCurrency(value: number) {
    return `$${value.toLocaleString()}`;
  }

  function getSourceBadgeClasses(sourceType: ScholarshipProjectionResult['sourceType']) {
    if (sourceType === 'modeled') {
      return 'border-amber-200 bg-amber-50 text-amber-800';
    }

    if (sourceType === 'school-page') {
      return 'border-emerald-200 bg-emerald-50 text-emerald-800';
    }

    return 'border-slate-200 bg-slate-50 text-slate-700';
  }

  function getTierDisplayName(
    tier: ScholarshipNextStep | null | undefined,
    currentTierName?: string
  ) {
    if (!tier) return '';
    if (currentTierName && tier.tier_name === currentTierName) {
      return `Higher band within ${tier.tier_name}`;
    }
    return tier.tier_name;
  }

  function getLaterTierBadge(tier: ScholarshipNextStep) {
    if (tier.dimensionsNeeded <= 1 && tier.actGap > 0 && tier.actGap <= 2) {
      return 'Nearby upside';
    }

    if (tier.dimensionsNeeded <= 1) {
      return 'Score-driven';
    }

    return 'Longer-range';
  }

  function getRoiTarget(nextSteps: ScholarshipNextStep[], currentFourYearValue: number) {
    const candidates = nextSteps
      .filter((step) => step.actGap > 0 && step.actGap <= 4)
      .map((step) => ({
        ...step,
        additionalFourYearValue: step.projected_total_usd - currentFourYearValue
      }))
      .filter((step) => step.additionalFourYearValue > 0);

    if (!candidates.length) {
      return null;
    }

    return [...candidates].sort((a, b) => {
      if (a.additionalFourYearValue !== b.additionalFourYearValue) {
        return b.additionalFourYearValue - a.additionalFourYearValue;
      }

      const aActOnly = a.gpaGap === 0 ? 0 : 1;
      const bActOnly = b.gpaGap === 0 ? 0 : 1;
      if (aActOnly !== bActOnly) return aActOnly - bActOnly;

      if (a.actGap !== b.actGap) return a.actGap - b.actGap;

      if (a.dimensionsNeeded !== b.dimensionsNeeded) {
        return a.dimensionsNeeded - b.dimensionsNeeded;
      }

      return a.projected_total_usd - b.projected_total_usd;
    })[0];
  }

  function getRoiOpportunity(roiTarget: ReturnType<typeof getRoiTarget>) {
    if (!roiTarget) {
      return {
        target: null,
        showStrongCta: false,
        showSoftMessage: false
      };
    }

    const isActOnly = roiTarget.actGap > 0 && roiTarget.gpaGap === 0;
    const isCloseActLift = roiTarget.actGap > 0 && roiTarget.actGap <= 2;
    const isHighValueJump = roiTarget.additionalFourYearValue >= 8000;
    const isModerateValueJump = roiTarget.additionalFourYearValue >= 4000;

    return {
      target: roiTarget,
      showStrongCta: isActOnly && isCloseActLift && isHighValueJump,
      showSoftMessage: !isActOnly && roiTarget.dimensionsNeeded === 2 && isModerateValueJump
    };
  }
</script>

{#if projections.length === 0}
  <div class="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-8 text-slate-500 shadow-sm">
    {#if hasSearched}
      <p class="text-lg font-semibold text-ink">No matching scholarship tiers were found.</p>
      <p class="mt-2 max-w-2xl text-sm text-slate-600">
        Try a different residency or filter to widen the results, or adjust GPA and ACT to compare other scholarship paths.
      </p>
    {:else}
      <p class="text-lg font-semibold text-ink">Enter GPA and ACT score to estimate scholarships.</p>
      <p class="mt-2 max-w-2xl text-sm text-slate-600">
        The calculator will show what is already on the table, what the next target looks like, and where a score increase could create the biggest upside.
      </p>
    {/if}
  </div>
{:else}
  <div class="mt-8 space-y-8">
    <div class="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 px-6 py-6 text-white shadow-xl shadow-slate-900/10">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">Scholarship outlook</p>
      <div class="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="text-2xl font-black">See where your student stands and where the biggest savings may still be available.</h2>
          <p class="mt-2 max-w-3xl text-sm text-sky-100/90">
            Each result shows what your student already qualifies for, what the next scholarship move looks like, and where stronger scores could still lower the total college cost.
          </p>
        </div>
        <div class="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
          {projections.length} school{projections.length === 1 ? '' : 's'} matched
        </div>
      </div>
    </div>

    {#each projections as school}
      {@const currentFourYearValue = school.primary.projected_total_usd}
      {@const featuredNext = school.nextSteps[0]}
      {@const additionalFourYearValue = featuredNext
        ? featuredNext.projected_total_usd - currentFourYearValue
        : 0}
      {@const roiTarget = getRoiTarget(school.nextSteps, currentFourYearValue)}
      {@const roiOpportunity = getRoiOpportunity(roiTarget)}

      <article class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
        <div class="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_32%),linear-gradient(135deg,_#ffffff,_#f8fafc)] px-6 py-6">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Scholarship snapshot</p>
              <h3 class="mt-2 text-2xl font-black text-ink">{school.schoolName}</h3>
              <p class="mt-2 max-w-2xl text-sm text-slate-600">
                Your student's current scholarship position, next move, and the upside worth paying attention to.
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${getSourceBadgeClasses(school.sourceType)}`}>
                  {school.sourceLabel}
                </span>
                {#if school.sourceUrl}
                  <a
                    href={school.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                  >
                    View source
                  </a>
                {/if}
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <div class="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Current tier</p>
                <p class="mt-2 text-sm font-semibold text-ink">{school.primary.tier_name}</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Per year</p>
                <p class="mt-2 text-lg font-black text-ink">{formatCurrency(school.primary.annual_award_usd)}</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">4-year value</p>
                <p class="mt-2 text-lg font-black text-ink">{formatCurrency(currentFourYearValue)}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-6 px-6 py-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div class="space-y-6">
            {#if featuredNext}
              <section class="rounded-[1.75rem] border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-slate-50 p-5 shadow-sm">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Next target</p>
                    <h4 class="mt-2 text-2xl font-black text-ink">
                      {getTierDisplayName(featuredNext, school.primary.tier_name)}
                    </h4>
                    <p class="mt-2 text-sm text-slate-600">
                      The most natural next scholarship move from your student's current position.
                    </p>
                  </div>

                  <div class="rounded-2xl border border-sky-200 bg-white px-4 py-3">
                    <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Target value</p>
                    <p class="mt-2 text-lg font-black text-ink">{formatCurrency(featuredNext.projected_total_usd)}</p>
                    <p class="text-xs text-slate-500">over 4 years</p>
                  </div>
                </div>

                {#if additionalFourYearValue > 0}
                  <div class="mt-4 rounded-2xl bg-ink px-4 py-4 text-white">
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Value unlocked</p>
                    <p class="mt-2 text-2xl font-black">+{formatCurrency(additionalFourYearValue)}</p>
                    <p class="mt-1 text-sm text-slate-200">additional scholarship value over 4 years from this next step alone</p>
                  </div>
                {/if}

                {#if featuredNext.requirementDetails.length > 0}
                  <div class="mt-5">
                    <p class="text-sm font-bold text-ink">What it takes to reach this tier</p>
                    <div class="mt-3 grid gap-3 md:grid-cols-2">
                      {#each featuredNext.requirementDetails as detail}
                        <div class={`rounded-2xl border px-4 py-3 text-sm ${detail.met ? 'border-slate-200 bg-white text-slate-500' : 'border-sky-200 bg-sky-50 text-ink'}`}>
                          <p class="font-semibold">{detail.label}</p>
                          <p class="mt-1 text-xs uppercase tracking-[0.14em] {detail.met ? 'text-slate-400' : 'text-sky-700'}">
                            {detail.met ? 'Already covered' : 'Needs attention'}
                          </p>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

                {#if featuredNext.requires_separate_application || featuredNext.application_note}
                  <div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700">
                    <p class="font-semibold text-ink">Application note</p>
                    {#if featuredNext.requires_separate_application}
                      <p class="mt-1">This scholarship may require a separate application.</p>
                    {/if}
                    {#if featuredNext.application_note}
                      <p class="mt-1">{featuredNext.application_note}</p>
                    {/if}
                  </div>
                {/if}
              </section>
            {/if}

            {#if school.nextSteps.length > 1}
              <section class="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-5">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Higher tiers after that</p>
                    <p class="mt-2 text-sm text-slate-600">A few longer-range targets if your student keeps climbing.</p>
                  </div>
                </div>

                <div class="mt-4 space-y-4">
                  {#each school.nextSteps.slice(1) as tier}
                    <div class="rounded-2xl border border-slate-200 bg-white p-4">
                      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p class="text-base font-bold text-ink">
                            {getTierDisplayName(tier, school.primary.tier_name)}
                          </p>
                          <p class="mt-1 text-sm text-slate-600">{formatCurrency(tier.projected_total_usd)} over 4 years</p>
                        </div>
                        <div class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                          {getLaterTierBadge(tier)}
                        </div>
                      </div>

                      {#if tier.requirementDetails.length > 0}
                        <ul class="mt-3 space-y-2 text-sm text-slate-600">
                          {#each tier.requirementDetails as detail}
                            <li class="rounded-xl bg-slate-50 px-3 py-2">{detail.label}</li>
                          {/each}
                        </ul>
                      {/if}

                      {#if tier.requires_separate_application || tier.application_note}
                        <div class="mt-3 text-sm text-slate-500">
                          {#if tier.requires_separate_application}
                            <p>May require a separate scholarship application.</p>
                          {/if}
                          {#if tier.application_note}
                            <p>{tier.application_note}</p>
                          {/if}
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
              </section>
            {/if}
          </div>

          <div class="space-y-6">
            {#if roiOpportunity.target && roiOpportunity.showStrongCta}
              <section class="rounded-[1.75rem] border border-sky-200 bg-gradient-to-br from-sky-600 via-sky-700 to-slate-900 p-5 text-white shadow-lg shadow-sky-900/20">
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-100">Big upside</p>
                <h4 class="mt-3 text-2xl font-black">
                  +{roiOpportunity.target.actGap} ACT point{roiOpportunity.target.actGap === 1 ? '' : 's'} could mean +{formatCurrency(roiOpportunity.target.additionalFourYearValue)}
                </h4>
                <p class="mt-3 text-sm text-sky-50/90">
                  Reaching {getTierDisplayName(roiOpportunity.target, school.primary.tier_name)} creates one of the biggest scholarship jumps available within four ACT points.
                </p>
                <a
                  href="/enroll"
                  use:preserveMarketingParams
                  use:trackEnrollCta={{ cta_location: 'scholarship_calculator_strong', cta_label: 'Enroll now' }}
                  class="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  Enroll now
                </a>
              </section>
            {:else if roiOpportunity.target && roiOpportunity.showSoftMessage}
              <section class="rounded-[1.75rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Big upside</p>
                <h4 class="mt-3 text-2xl font-black text-ink">
                  +{formatCurrency(roiOpportunity.target.additionalFourYearValue)} is still in play
                </h4>
                <p class="mt-3 text-sm text-slate-700">
                  A score improvement of just {roiOpportunity.target.actGap} ACT point{roiOpportunity.target.actGap === 1 ? '' : 's'} could move your student toward {getTierDisplayName(roiOpportunity.target, school.primary.tier_name)}.
                </p>
                <p class="mt-2 text-sm text-slate-600">
                  {#if roiOpportunity.target.gpaGap > 0}
                    Stronger grades may also be part of the path to reach the full award.
                  {:else}
                    This is one of the most attractive nearby scholarship jumps on the board.
                  {/if}
                </p>
                <a
                  href="/enroll"
                  use:preserveMarketingParams
                  use:trackEnrollCta={{ cta_location: 'scholarship_calculator_soft', cta_label: 'See class options' }}
                  class="mt-5 inline-flex rounded-full border border-amber-300 px-5 py-3 text-sm font-bold text-ink transition hover:bg-amber-100"
                >
                  See class options
                </a>
              </section>
            {:else}
              <section class="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Big upside</p>
                <h4 class="mt-3 text-2xl font-black text-ink">Scholarship value can move quickly from here.</h4>
                <p class="mt-3 text-sm text-slate-600">
                  Even if this school does not show the biggest nearby automatic jump, stronger scores can still help your student compete for more scholarship value here or make outside scholarships more worth pursuing.
                </p>
                <p class="mt-2 text-sm text-slate-600">
                  This is often where families start looking beyond the basic merit ladder to competitive awards, departmental aid, and outside scholarships.
                </p>
              </section>
            {/if}

            {#if school.note}
              <section class="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Important note</p>
                <p class="mt-3 text-sm leading-6 text-slate-600">{school.note}</p>
              </section>
            {/if}

            <section class="rounded-[1.75rem] border border-slate-200 bg-white p-5">
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">What to do with this</p>
              <ul class="mt-3 space-y-3 text-sm text-slate-600">
                <li class="rounded-2xl bg-slate-50 px-4 py-3">
                  Compare what your student already qualifies for with the next scholarship jump before setting a score goal.
                </li>
                <li class="rounded-2xl bg-slate-50 px-4 py-3">
                  If the next jump adds meaningful four-year value, it is often worth treating that score range as a real prep target.
                </li>
                <li class="rounded-2xl bg-slate-50 px-4 py-3">
                  The clearest opportunities are usually the schools where one to three ACT points can noticeably lower the total cost.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    {/each}
  </div>
{/if}
