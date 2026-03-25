<script lang="ts">
  export let projections = [];
</script>

{#if projections.length === 0}
  <div class="mt-8 rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500">
    Enter GPA and ACT score to estimate scholarships.
  </div>
{:else}
  <div class="mt-8 space-y-6">
    {#each projections as school}
      {@const currentFourYearValue = school.primary.projected_total_usd}
      {@const featuredNext = school.nextSteps[0]}
      {@const additionalFourYearValue = featuredNext
        ? featuredNext.projected_total_usd - currentFourYearValue
        : 0}

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-xl font-bold text-ink">
          {school.schoolName}
        </h2>

        <div class="mt-4">
          <p class="text-sm text-slate-500 uppercase tracking-wide">Current tier</p>
          <div class="mt-1 text-base font-semibold">
            {school.primary.tier_name}
          </div>
          <div class="text-slate-700">
            ${school.primary.annual_award_usd.toLocaleString()} / year
          </div>
          <div class="text-sm text-slate-500">
            ${school.primary.projected_total_usd.toLocaleString()} over 4 years
          </div>
        </div>

        {#if featuredNext}
          <div class="mt-5 rounded-2xl bg-slate-50 p-4">
            <p class="text-sm text-slate-500 uppercase tracking-wide">Next target</p>

            <div class="mt-1 text-lg font-semibold text-ink">
              {featuredNext.tier_name}
            </div>

            <div class="mt-2 text-sm text-slate-700">
              {#if featuredNext.status === 'act_needed'}
                Raise ACT by {featuredNext.actGap}
              {:else if featuredNext.status === 'gpa_needed'}
                Raise GPA to {featuredNext.min_unweighted_gpa}
              {:else if featuredNext.status === 'gpa_and_act_needed'}
                Raise GPA and ACT
              {/if}
            </div>

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

            {#if featuredNext.requires_separate_application}
              <div class="mt-2 text-sm text-slate-500">
                May require a separate scholarship application.
              </div>
            {/if}
          </div>
        {/if}

        {#if school.nextSteps.length > 1}
          <div class="mt-4">
            <p class="text-sm text-slate-500 uppercase tracking-wide">Higher tiers after that</p>

            <ul class="mt-2 space-y-2">
              {#each school.nextSteps.slice(1) as tier}
                <li class="text-sm">
                  <span class="font-semibold">{tier.tier_name}</span>
                  — ${tier.projected_total_usd.toLocaleString()} over 4 years

                  {#if tier.status === 'act_needed'}
                    <span class="text-slate-500">
                      (ACT {tier.min_act}, +{tier.actGap})
                    </span>
                  {:else if tier.status === 'gpa_needed'}
                    <span class="text-slate-500">
                      (GPA {tier.min_unweighted_gpa})
                    </span>
                  {:else if tier.status === 'gpa_and_act_needed'}
                    <span class="text-slate-500">
                      (GPA + ACT improvement needed)
                    </span>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if school.note}
          <div class="mt-4 text-sm text-slate-500">
            {school.note}
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}