<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import {
    formatCurrency,
    getNearbyScoreTargets,
    getRoiOpportunity,
    getRoiTarget,
    getTierDisplayName,
    hasScoreBasedTarget,
    isCompetitiveNoThresholdTarget,
    isGpaOnlyAutomaticTarget
  } from '$lib/scholarships/display';
  import type { ScholarshipProjectionResult } from '$lib/types';

  export let school: ScholarshipProjectionResult;

  $: currentFourYearValue = school.primary.projected_total_usd;
  $: featuredNext = school.nextSteps[0];
  $: roiTarget = getRoiTarget(school.nextSteps, currentFourYearValue, featuredNext);
  $: roiOpportunity = getRoiOpportunity(roiTarget);
  $: hasScoreTarget = hasScoreBasedTarget(school.nextSteps);
  $: nearbyScoreTargets = getNearbyScoreTargets(school.nextSteps, currentFourYearValue);
  $: isCompetitiveOnlyTarget = isCompetitiveNoThresholdTarget(featuredNext);
  $: isGpaOnlyAutomaticPath = isGpaOnlyAutomaticTarget(featuredNext) && !hasScoreTarget;
</script>

<div class="space-y-6">
  {#if roiOpportunity.target && roiOpportunity.showStrongCta}
    <section class="rounded-[1.75rem] border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 shadow-sm shadow-rose-900/5">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-clay">Big upside</p>
      <h4 class="mt-3 text-2xl font-black text-ink">
        <span>+{roiOpportunity.target.actGap} ACT point{roiOpportunity.target.actGap === 1 ? '' : 's'}</span>
        <span class="block text-clay">could unlock {formatCurrency(roiOpportunity.target.additionalFourYearValue)}</span>
      </h4>
      <p class="mt-3 text-sm text-slate-700">
        Reaching {getTierDisplayName(roiOpportunity.target, school.primary.tier_name)} creates one of the biggest scholarship jumps available within four ACT points.
      </p>
      <a
        href="/enroll"
        use:preserveMarketingParams
        use:trackEnrollCta={{ cta_location: 'scholarship_calculator_strong', cta_label: 'See ACT Class Options' }}
        class="mt-5 inline-flex w-full justify-center rounded-full bg-clay px-6 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-rose-900/20 transition hover:bg-rose-800 sm:w-auto"
      >
        See ACT Class Options
      </a>
    </section>
  {:else if roiOpportunity.target && roiOpportunity.showSoftMessage}
    <section class="rounded-[1.75rem] border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 shadow-sm shadow-rose-900/5">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-clay">Big upside</p>
      <h4 class="mt-3 text-2xl font-black text-ink">
        {formatCurrency(roiOpportunity.target.additionalFourYearValue)}
        <span class="block text-clay">is still in play</span>
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
        use:trackEnrollCta={{ cta_location: 'scholarship_calculator_soft', cta_label: 'See ACT Class Options' }}
        class="mt-5 inline-flex w-full justify-center rounded-full bg-clay px-6 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-rose-900/20 transition hover:bg-rose-800 sm:w-auto"
      >
        See ACT Class Options
      </a>
    </section>
  {:else if roiOpportunity.target && roiOpportunity.showNearbyValue}
    <section class="rounded-[1.75rem] border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 shadow-sm shadow-rose-900/5">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-clay">Nearby upside</p>
      <h4 class="mt-3 text-2xl font-black text-ink">
        <span>+{roiOpportunity.target.actGap} ACT point{roiOpportunity.target.actGap === 1 ? '' : 's'}</span>
        <span class="block text-clay">could unlock {formatCurrency(roiOpportunity.target.additionalFourYearValue)}</span>
      </h4>
      <p class="mt-3 text-sm text-slate-700">
        Reaching {getTierDisplayName(roiOpportunity.target, school.primary.tier_name)} appears to be the closest score-based scholarship move from here.
      </p>
      <p class="mt-2 text-sm text-slate-600">
        This is the kind of nearby band that can be worth using as a concrete score target.
      </p>
      <a
        href="/enroll"
        use:preserveMarketingParams
        use:trackEnrollCta={{ cta_location: 'scholarship_calculator_nearby', cta_label: 'See ACT Class Options' }}
        class="mt-5 inline-flex w-full justify-center rounded-full bg-clay px-6 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-rose-900/20 transition hover:bg-rose-800 sm:w-auto"
      >
        See ACT Class Options
      </a>
    </section>
  {:else if !isCompetitiveOnlyTarget}
    <section class="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
      {#if school.nextSteps.length === 0}
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Competitive upside</p>
        <h4 class="mt-3 text-2xl font-black text-ink">The automatic ladder may be maxed, but the scholarship search is not.</h4>
        <p class="mt-3 text-sm text-slate-600">
          Once a student reaches the highest automatic tier, stronger scores can still matter for competitive scholarships, honors programs, departmental awards, and other funding that may require a separate application.
        </p>
        <p class="mt-2 text-sm text-slate-600">
          This is the point where families should use the school source to look beyond automatic merit and identify awards where a stronger academic profile can still help.
        </p>
      {:else}
        {#if hasScoreTarget}
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Longer-range upside</p>
          <h4 class="mt-3 text-2xl font-black text-ink">The next automatic score jump is farther out.</h4>
          <p class="mt-3 text-sm text-slate-600">
            This school still has higher automatic tiers, but the next score-based move is not a nearby ACT target from the current inputs.
          </p>
          <p class="mt-2 text-sm text-slate-600">
            It can still be worth tracking, especially if this school stays high on the list or if GPA improvement is also realistic.
          </p>
        {:else if isGpaOnlyAutomaticPath}
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">GPA-based automatic award</p>
          <h4 class="mt-3 text-2xl font-black text-ink">This scholarship path does not use ACT for the automatic award.</h4>
          <p class="mt-3 text-sm text-slate-600">
            The automatic scholarship shown here is driven by GPA, so a higher ACT score may not change this listed award.
          </p>
          <p class="mt-2 text-sm text-slate-600">
            Stronger scores can still help with competitive, selective, honors, or departmental scholarships beyond the automatic GPA-based award.
          </p>
        {:else}
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Competitive upside</p>
          <h4 class="mt-3 text-2xl font-black text-ink">Scores may still matter beyond the automatic path.</h4>
          <p class="mt-3 text-sm text-slate-600">
            The automatic tiers shown here do not point to a nearby ACT-based jump.
          </p>
          <p class="mt-2 text-sm text-slate-600">
            A stronger ACT score can still improve the student's profile for selective awards, honors programs, and reviewed funding.
          </p>
        {/if}
      {/if}
    </section>
  {/if}

  {#if nearbyScoreTargets.length > 0}
    <section class="rounded-[1.75rem] border border-slate-200 bg-white p-5">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Score target snapshot</p>
      <div class="mt-3 space-y-3">
        {#each nearbyScoreTargets as target}
          <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div class="grid gap-2 sm:grid-cols-[minmax(0,1fr)_max-content] sm:items-center">
              <div class="min-w-0">
                <p class="text-sm font-bold text-ink">
                  +{target.actGap} ACT point{target.actGap === 1 ? '' : 's'}
                </p>
                <p class="mt-1 max-w-[30rem] text-sm leading-5 text-slate-600">
                  Toward {getTierDisplayName(target, school.primary.tier_name)}
                </p>
              </div>
              <p class="whitespace-nowrap text-left text-sm font-black text-sky-800 sm:text-right">
                +{formatCurrency(target.additionalFourYearValue)}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  {#if school.note}
    <section class="rounded-[1.75rem] border border-slate-200 bg-white p-5">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Important note</p>
      <p class="mt-3 text-sm leading-6 text-slate-600">{school.note}</p>
    </section>
  {/if}

  {#if !isCompetitiveOnlyTarget}
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
  {/if}
</div>
