<script lang="ts">
  export let hasSearched = false;
</script>

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
