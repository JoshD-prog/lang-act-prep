<script lang="ts">
  import ScholarshipEmptyState from '$lib/components/scholarships/ScholarshipEmptyState.svelte';
  import ScholarshipOpportunityPanel from '$lib/components/scholarships/ScholarshipOpportunityPanel.svelte';
  import ScholarshipOutlookSummary from '$lib/components/scholarships/ScholarshipOutlookSummary.svelte';
  import {
    formatCurrency,
    getLaterTierBadge,
    getRequirementMetricLabel,
    getRequirementStatusLabel,
    getRequirementValueLabel,
    getRoiTarget,
    getSourceBadgeClasses,
    getSourceHref,
    getTargetBadges,
    getTierDisplayName,
    getTopNearbyOpportunities,
    isCompetitiveNoThresholdTarget,
    isGpaOnlyAutomaticTarget
  } from '$lib/scholarships/display';
  import type { ScholarshipProjectionResult } from '$lib/types';

  export let projections: ScholarshipProjectionResult[] = [];
  export let hasSearched = false;
</script>

{#if projections.length === 0}
  {#if hasSearched}
    <ScholarshipEmptyState {hasSearched} />
  {/if}
{:else}
  {@const topNearbyOpportunities = getTopNearbyOpportunities(projections)}
  <div class="mt-8 space-y-8">
    <ScholarshipOutlookSummary
      matchedSchoolCount={projections.length}
      {topNearbyOpportunities}
    />

    {#each projections as school}
      {@const currentFourYearValue = school.primary.projected_total_usd}
      {@const featuredNext = school.nextSteps[0]}
      {@const additionalFourYearValue = featuredNext
        ? featuredNext.projected_total_usd - currentFourYearValue
        : 0}
      {@const sourceHref = getSourceHref(school.sourceUrl)}
      {@const isTopNearbyOpportunity = topNearbyOpportunities.some((opportunity) => opportunity.schoolSlug === school.schoolSlug)}
      {@const isCompetitiveOnlyTarget = isCompetitiveNoThresholdTarget(featuredNext)}
      {@const cardRoiTarget = getRoiTarget(school.nextSteps, currentFourYearValue, featuredNext)}
      {@const cardRoiUpside = cardRoiTarget
        ? cardRoiTarget.projected_total_usd - currentFourYearValue
        : 0}
      {@const isGpaOnlyAutomaticTargetCard = isGpaOnlyAutomaticTarget(featuredNext)}

      <details class="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
        <summary class="cursor-pointer list-none border-b border-slate-200 bg-slate-50 px-6 py-6">
          <div class="grid gap-5 xl:grid-cols-[1fr_22rem] xl:items-center">
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Scholarship estimate</p>
              <h3 class="mt-2 text-2xl font-black text-ink">{school.schoolName}</h3>
              <p class="mt-2 max-w-2xl text-sm text-slate-600">
                {#if cardRoiTarget}
                  The next ACT-based tier is shown here. Open the card to compare its requirements and four-year value.
                {:else if isCompetitiveOnlyTarget}
                  Competitive scholarship opportunity. Open the card for context on how to read it.
                {:else if isGpaOnlyAutomaticTargetCard}
                  This automatic award is based on GPA. Open the card to see its requirements and value.
                {:else}
                  The current published tier and the next higher tier are shown here. Open the card for details.
                {/if}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${getSourceBadgeClasses(school.sourceType)}`}>
                  {school.sourceLabel}
                </span>
                <span class="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                  Updated May 2026
                </span>
                {#if isTopNearbyOpportunity}
                  <span class="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                    Top nearby value
                  </span>
                {/if}
              </div>
              <div class="mt-5 flex justify-center">
                <span class="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-sky-800 shadow-sm transition group-hover:border-sky-300 group-hover:bg-sky-50 group-open:hidden">
                  View details <span class="text-base leading-none">+</span>
                </span>
                <span class="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-slate-600 shadow-sm transition group-hover:border-slate-300 group-hover:bg-slate-50 group-open:inline-flex">
                  Hide details <span class="text-base leading-none">-</span>
                </span>
              </div>
            </div>

            <div class={`rounded-[1.5rem] border bg-white p-4 shadow-sm ${isCompetitiveOnlyTarget ? 'border-slate-300' : 'border-sky-200'}`}>
              {#if cardRoiTarget}
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
                  {cardRoiTarget.actGap <= 2 ? 'Next score tier' : 'Later score tier'}
                </p>
                <p class="mt-2 text-2xl font-black text-ink">
                  <span>+{cardRoiTarget.actGap} ACT point{cardRoiTarget.actGap === 1 ? '' : 's'}</span>
                  <span class="block text-sky-800">may add {formatCurrency(cardRoiUpside)}</span>
                </p>
                <p class="mt-1 text-sm text-slate-600">
                  Toward {getTierDisplayName(cardRoiTarget, school.primary.tier_name)}
                </p>
              {:else if isCompetitiveOnlyTarget && featuredNext}
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Competitive opportunity</p>
                <p class="mt-2 text-2xl font-black text-ink">{formatCurrency(featuredNext.projected_total_usd)}</p>
                <p class="mt-1 text-sm text-slate-600">Potential value, not guaranteed</p>
              {:else if isGpaOnlyAutomaticTargetCard && featuredNext}
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">GPA-based automatic award</p>
                <p class="mt-2 text-2xl font-black text-ink">{formatCurrency(featuredNext.projected_total_usd)}</p>
                <p class="mt-1 text-sm text-slate-600">ACT is not used for this listed award</p>
              {:else}
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Current 4-year value</p>
                <p class="mt-2 text-2xl font-black text-ink">{formatCurrency(currentFourYearValue)}</p>
                <p class="mt-1 text-sm text-slate-600">{school.primary.tier_name}</p>
              {/if}
              <div class="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                <span class="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  {formatCurrency(currentFourYearValue)} current estimate
                </span>
              </div>
            </div>
          </div>
        </summary>

        <div class="grid gap-6 px-6 py-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div class="space-y-6">
            {#if sourceHref}
              <a
                href={sourceHref}
                target="_blank"
                rel="noreferrer"
                class="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
              >
                View source
              </a>
            {/if}

            {#if featuredNext}
              <section class="rounded-[1.75rem] border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-slate-50 p-5 shadow-sm">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                      {isCompetitiveOnlyTarget ? 'Competitive opportunity' : 'Next target'}
                    </p>
                    <h4 class="mt-2 text-2xl font-black text-ink">
                      {getTierDisplayName(featuredNext, school.primary.tier_name)}
                    </h4>
                    <div class="mt-3 flex flex-wrap gap-2">
                      {#each getTargetBadges(featuredNext) as badge}
                        <span class="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-sky-800">
                          {badge}
                        </span>
                      {/each}
                    </div>
                    <p class="mt-2 text-sm text-slate-600">
                      {#if isCompetitiveOnlyTarget}
                        A score-influenced scholarship opportunity to review with the school. It is competitive, so this is not a guaranteed automatic award.
                      {:else}
                        The next published scholarship tier above the student's current score and GPA.
                      {/if}
                    </p>
                  </div>

                  <div class="rounded-2xl border border-sky-200 bg-white px-4 py-3">
                    <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      {isCompetitiveOnlyTarget ? 'Possible amount' : 'Four-year estimate'}
                    </p>
                    <p class="mt-2 text-lg font-black text-ink">{formatCurrency(featuredNext.projected_total_usd)}</p>
                    <p class="text-xs text-slate-500">
                      {isCompetitiveOnlyTarget ? 'not guaranteed' : 'over 4 years'}
                    </p>
                  </div>
                </div>

                {#if additionalFourYearValue > 0 && !isCompetitiveOnlyTarget}
                  <div class="mt-4 rounded-2xl bg-ink px-4 py-4 text-white">
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Possible increase</p>
                    <p class="mt-2 text-2xl font-black">+{formatCurrency(additionalFourYearValue)}</p>
                    <p class="mt-1 text-sm text-slate-200">additional scholarship value over 4 years from this next step alone</p>
                  </div>
                {/if}

                {#if isCompetitiveOnlyTarget}
                  <div class="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                    <p class="font-semibold text-ink">Competitive scholarship</p>
                    <p class="mt-1">
                      Nebraska considers academic strength when reviewing these awards, but it does not publish a simple ACT/GPA-to-dollar ladder for this scholarship. A stronger score can still help the student compete.
                    </p>
                  </div>
                {:else if featuredNext.requirementDetails.length > 0}
                  <div class="mt-5">
                    <p class="text-sm font-bold text-ink">Ways to qualify</p>
                    <div class="mt-3 grid gap-3 md:grid-cols-2">
                      {#each featuredNext.requirementDetails as detail}
                        <div class={`rounded-2xl border px-4 py-3 text-sm ${detail.met ? 'border-slate-200 bg-white text-slate-500' : 'border-sky-200 bg-sky-50 text-ink'}`}>
                          <div class="flex items-start gap-3">
                            <span class={`inline-flex min-w-12 justify-center rounded-full px-2 py-1 text-xs font-black uppercase tracking-[0.12em] ${detail.met ? 'bg-slate-100 text-slate-500' : 'bg-sky-100 text-sky-800'}`}>
                              {getRequirementMetricLabel(detail)}
                            </span>
                            <p class="font-semibold">{getRequirementValueLabel(detail)}</p>
                          </div>
                          <p class="mt-1 text-xs uppercase tracking-[0.14em] {detail.met ? 'text-slate-400' : 'text-sky-700'}">
                            {getRequirementStatusLabel(detail)}
                          </p>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}

              </section>
            {:else}
              <section class="rounded-[1.75rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-5 shadow-sm">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Top Tier</p>
                    <h4 class="mt-2 text-2xl font-black text-ink">
                      Your student already appears to be at the highest automatic scholarship tier. Competitive scholarships can provide even more value.
                    </h4>
                    <p class="mt-3 text-sm leading-6 text-slate-600">
                      A higher ACT score can still strengthen applications for selective scholarships.
                      <strong class="font-bold text-ink">Students can keep building opportunity.</strong>
                      Stronger scores can make them more competitive for selective scholarships,
                      departmental awards, honors college funding, and other application-based aid.
                    </p>
                  </div>

                  <div class="rounded-2xl border border-emerald-200 bg-white px-4 py-3">
                    <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Current value</p>
                    <p class="mt-2 text-lg font-black text-ink">{formatCurrency(currentFourYearValue)}</p>
                    <p class="text-xs text-slate-500">
                      {isCompetitiveOnlyTarget ? 'not guaranteed' : 'over 4 years'}
                    </p>
                  </div>
                </div>

                <div class="mt-5 grid gap-3 md:grid-cols-2">
                  <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                    <p class="font-semibold text-ink">Next practical move</p>
                    <p class="mt-1">
                      Check the school source for competitive awards and separate applications.
                    </p>
                  </div>
                  <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                    <p class="font-semibold text-ink">Why scores still matter</p>
                    <p class="mt-1">
                      A higher score may help with scholarships that consider the student's full application.
                    </p>
                  </div>
                </div>
              </section>
            {/if}

            {#if school.nextSteps.length > 1}
              <details class="group/paths rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-5">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Other scholarship tiers</p>
                    <p class="mt-2 text-sm text-slate-600">Compare the requirements and estimated amounts for additional tiers.</p>
                  </div>
                  <span class="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-600 group-open/paths:hidden">
                    See more
                  </span>
                  <span class="hidden shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-600 group-open/paths:inline-flex">
                    Hide
                  </span>
                </summary>

                <div class="mt-4 space-y-4">
                  {#each school.nextSteps.slice(1) as tier}
                    <div class="rounded-2xl border border-slate-200 bg-white p-4">
                      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p class="text-base font-bold text-ink">
                            {getTierDisplayName(tier, school.primary.tier_name)}
                          </p>
                          <p class="mt-1 text-sm text-slate-600">{formatCurrency(tier.projected_total_usd)} over 4 years</p>
                          <div class="mt-2 flex flex-wrap gap-2">
                            {#each getTargetBadges(tier) as badge}
                              <span class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-slate-600">
                                {badge}
                              </span>
                            {/each}
                          </div>
                        </div>
                        <div class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                          {getLaterTierBadge(tier)}
                        </div>
                      </div>

                      {#if tier.requirementDetails.length > 0}
                        {#if isCompetitiveNoThresholdTarget(tier)}
                          <p class="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                            Score-influenced competitive award with no fixed ACT/GPA payout threshold published.
                          </p>
                        {:else}
                          <ul class="mt-3 space-y-2 text-sm text-slate-600">
                            {#each tier.requirementDetails as detail}
                              <li class="flex items-start gap-3 rounded-xl bg-slate-50 px-3 py-2">
                                <span class="inline-flex min-w-10 justify-center rounded-full bg-white px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.12em] text-slate-500">
                                  {getRequirementMetricLabel(detail)}
                                </span>
                                <span>{getRequirementValueLabel(detail)}</span>
                              </li>
                            {/each}
                          </ul>
                        {/if}
                      {/if}
                    </div>
                  {/each}
                </div>
              </details>
            {/if}
          </div>

          <ScholarshipOpportunityPanel {school} />
        </div>
      </details>
    {/each}
  </div>
{/if}
