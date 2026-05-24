<script lang="ts">
  import { formatCurrency } from '$lib/scholarships/display';
  import type { TopNearbyOpportunity } from '$lib/scholarships/display';

  type LeadCaptureForm = {
    success?: boolean;
    message?: string;
    values?: {
      fullName?: string;
      email?: string;
      phone?: string;
      studentGrade?: string;
      note?: string;
    };
  } | null;

  export let gpa = 0;
  export let act = 0;
  export let residency = 'KS';
  export let filter = 'best';
  export let hasSearched = false;
  export let topNearbyOpportunities: TopNearbyOpportunity[] = [];
  export let form: LeadCaptureForm = null;

  $: strongestOpportunity = topNearbyOpportunities[0];
</script>

{#if hasSearched}
  <section class="mt-8 rounded-[2rem] border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-6 shadow-lg shadow-rose-900/5">
    <div class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-clay">Want help interpreting this?</p>
        <h2 class="mt-2 text-2xl font-black text-ink">Send the snapshot and turn it into a score plan.</h2>
        <p class="mt-3 text-sm leading-6 text-slate-700">
          We can help compare the nearby scholarship upside with the student&apos;s timeline, current score, and realistic prep target.
        </p>

        {#if strongestOpportunity}
          <div class="mt-4 rounded-2xl border border-rose-100 bg-white px-4 py-3">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Included result</p>
            <p class="mt-1 text-sm font-bold text-ink">{strongestOpportunity.schoolName}</p>
            <p class="mt-1 text-sm text-slate-600">
              +{strongestOpportunity.actGap} ACT point{strongestOpportunity.actGap === 1 ? '' : 's'} could unlock
              <strong class="font-black text-clay">{formatCurrency(strongestOpportunity.additionalFourYearValue)}</strong>
              over 4 years.
            </p>
          </div>
        {/if}

        <p class="mt-4 text-xs leading-5 text-slate-500">
          Scholarship amounts can change. School source links remain the final reference before families make enrollment or financial decisions.
        </p>
      </div>

      <form method="POST" action="?/sendResults" class="grid gap-3 rounded-[1.5rem] border border-white bg-white p-4 shadow-sm md:grid-cols-2">
        <input type="hidden" name="gpa" value={gpa} />
        <input type="hidden" name="act" value={act} />
        <input type="hidden" name="residency" value={residency} />
        <input type="hidden" name="filter" value={filter} />
        <input type="hidden" name="topOpportunitySchool" value={strongestOpportunity?.schoolName ?? ''} />
        <input type="hidden" name="topOpportunityActGap" value={strongestOpportunity?.actGap ?? ''} />
        <input type="hidden" name="topOpportunityValue" value={strongestOpportunity?.additionalFourYearValue ?? ''} />

        <label class="block">
          <span class="text-sm font-semibold text-slate-700">Name</span>
          <input name="fullName" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.fullName ?? ''} required />
        </label>

        <label class="block">
          <span class="text-sm font-semibold text-slate-700">Email</span>
          <input name="email" type="email" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.email ?? ''} required />
        </label>

        <label class="block">
          <span class="text-sm font-semibold text-slate-700">Phone</span>
          <input name="phone" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.phone ?? ''} />
        </label>

        <label class="block">
          <span class="text-sm font-semibold text-slate-700">Student grade</span>
          <input name="studentGrade" placeholder="10, 11, 12" class="mt-1 w-full rounded-xl border-slate-300" value={form?.values?.studentGrade ?? ''} />
        </label>

        <label class="block md:col-span-2">
          <span class="text-sm font-semibold text-slate-700">Anything you want us to know?</span>
          <textarea name="note" rows="3" class="mt-1 w-full rounded-xl border-slate-300" placeholder="Target schools, next ACT date, or score goal">{form?.values?.note ?? ''}</textarea>
        </label>

        {#if form?.message}
          <p class={`md:col-span-2 rounded-xl p-3 text-sm ${form?.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'}`}>
            {form.message}
          </p>
        {/if}

        <div class="md:col-span-2">
          <button class="w-full rounded-full bg-clay px-6 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-rose-900/20 transition hover:bg-rose-800">
            Send my scholarship snapshot
          </button>
        </div>
      </form>
    </div>
  </section>
{/if}
