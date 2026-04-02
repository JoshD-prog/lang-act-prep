<script lang="ts">
  import type { ScholarshipNextStep, ScholarshipProjectionResult } from '$lib/types';

  export let projections: ScholarshipProjectionResult[] = [];
  export let hasSearched = false;

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
      showSoftMessage:
        !isActOnly &&
        roiTarget.dimensionsNeeded === 2 &&
        isModerateValueJump
    };
  }
</script>

{#if projections.length === 0}
  <div class="mt-8 rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500">
    {#if hasSearched}
      No matching scholarship tiers were found for this GPA, ACT score, residency, and filter combination.
    {:else}
      Enter GPA and ACT score to estimate scholarships.
    {/if}
  </div>
{:else}
  <div class="mt-8 space-y-6">
    {#each projections as school}
      {@const currentFourYearValue = school.primary.projected_total_usd}
      {@const featuredNext = school.nextSteps[0]}
      {@const additionalFourYearValue = featuredNext
        ? featuredNext.projected_total_usd - currentFourYearValue
        : 0}
      {@const roiTarget = getRoiTarget(school.nextSteps, currentFourYearValue)}
      {@const roiOpportunity = getRoiOpportunity(roiTarget)}

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-xl font-bold text-ink">{school.schoolName}</h2>

        <div class="mt-4">
          <p class="text-sm uppercase tracking-wide text-slate-500">Current tier</p>
          <div class="mt-1 text-base font-semibold">{school.primary.tier_name}</div>
          <div class="text-slate-700">${school.primary.annual_award_usd.toLocaleString()} / year</div>
          <div class="text-sm text-slate-500">
            ${school.primary.projected_total_usd.toLocaleString()} over 4 years
          </div>
        </div>

        {#if featuredNext}
          <div class="mt-5 rounded-2xl bg-slate-50 p-4">
            <p class="text-sm uppercase tracking-wide text-slate-500">Next target</p>

            <div class="mt-1 text-lg font-semibold text-ink">{featuredNext.tier_name}</div>

            <div class="mt-3 text-sm text-slate-600">
              Total value at this tier:
              <span class="font-semibold text-ink">
                ${featuredNext.projected_total_usd.toLocaleString()} over 4 years
              </span>
            </div>

            {#if additionalFourYearValue > 0}
              <div class="mt-1 text-base font-bold text-sky-700">
                Additional value unlocked: +${additionalFourYearValue.toLocaleString()} over 4 years
              </div>
            {/if}

            {#if featuredNext.requirementDetails.length > 0}
              <div class="mt-3 text-sm text-slate-700">
                <span class="font-semibold">Requirements to reach this tier:</span>
                <ul class="mt-1 list-disc pl-5">
                  {#each featuredNext.requirementDetails as detail}
                    <li class:text-slate-500={detail.met}>{detail.label}</li>
                  {/each}
                </ul>
              </div>
            {/if}

            {#if featuredNext.requires_separate_application}
              <div class="mt-2 text-sm text-slate-500">
                May require a separate scholarship application.
              </div>
            {/if}

            {#if featuredNext.application_note}
              <div class="mt-2 text-sm text-slate-500">{featuredNext.application_note}</div>
            {/if}

            {#if roiOpportunity.target && roiOpportunity.showStrongCta}
              <div class="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Why this matters</p>
                <p class="mt-2 text-lg font-bold text-ink">
                  +{roiOpportunity.target.actGap} ACT point{roiOpportunity.target.actGap === 1 ? '' : 's'} could mean +${roiOpportunity.target.additionalFourYearValue.toLocaleString()} over 4 years.
                </p>
                <p class="mt-2 text-sm text-slate-700">
                  Reaching {roiOpportunity.target.tier_name} would create one of the biggest scholarship jumps available within four ACT points.
                </p>
                <a
                  href="/enroll"
                  class="mt-3 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Enroll now
                </a>
              </div>
            {:else if roiOpportunity.target && roiOpportunity.showSoftMessage}
              <div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Big upside</p>
                <p class="mt-2 text-base font-bold text-ink">
                  A score improvement of just {roiOpportunity.target.actGap} ACT point{roiOpportunity.target.actGap === 1 ? '' : 's'} could add +${roiOpportunity.target.additionalFourYearValue.toLocaleString()} over 4 years.
                </p>
                <p class="mt-2 text-sm text-slate-700">
                  That opportunity is tied to {roiOpportunity.target.tier_name}{roiOpportunity.target.gpaGap > 0
                    ? ` and may also require stronger grades to reach the full award.`
                    : '.'}
                </p>
                <a
                  href="/enroll"
                  class="mt-3 inline-flex rounded-full border border-amber-300 px-4 py-2 text-sm font-bold text-ink transition hover:bg-amber-100"
                >
                  See class options
                </a>
              </div>
            {/if}
          </div>
        {/if}

        {#if school.nextSteps.length > 1}
          <div class="mt-4">
            <p class="text-sm uppercase tracking-wide text-slate-500">Higher tiers after that</p>

            <ul class="mt-2 space-y-2">
              {#each school.nextSteps.slice(1) as tier}
                <li class="text-sm">
                  <span class="font-semibold">{tier.tier_name}</span>
                  - ${tier.projected_total_usd.toLocaleString()} over 4 years

                  {#if tier.requirementDetails.length > 0}
                    <ul class="mt-1 list-disc pl-5 text-slate-500">
                      {#each tier.requirementDetails as detail}
                        <li class:text-slate-400={detail.met}>{detail.label}</li>
                      {/each}
                    </ul>
                  {/if}

                  {#if tier.requires_separate_application}
                    <div class="mt-1 text-slate-500">May require a separate scholarship application.</div>
                  {/if}

                  {#if tier.application_note}
                    <div class="mt-1 text-slate-500">{tier.application_note}</div>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if school.note}
          <div class="mt-4 text-sm text-slate-500">{school.note}</div>
        {/if}
      </div>
    {/each}
  </div>
{/if}
