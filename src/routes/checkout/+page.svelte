<script lang="ts">
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
  <title>Checkout | ACT Prep Classes</title>
</svelte:head>

<section class="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Payment</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Complete enrollment payment.</h1>
  <p class="mt-4 text-slate-600">
    Confirm details and continue to secure Stripe checkout.
  </p>

  <form method="POST" class="mt-6 grid gap-4">
    <input type="hidden" name="classSlug" value={data.classSlug} />
    <input type="hidden" name="schoolSlug" value={data.schoolSlug} />
    <label>
      <span class="text-sm font-semibold text-slate-700">Parent email for receipt</span>
      <input name="email" type="email" required value={data.email} class="mt-1 w-full rounded-xl border-slate-300" />
    </label>

    <div class="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
      <p><strong>Class:</strong> {data.classSlug || 'Not selected'}</p>
      <p><strong>School path:</strong> {data.schoolSlug || 'General'}</p>
    </div>

    {#if form?.message}
      <p class="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{form.message}</p>
    {/if}

    <button class="rounded-full bg-sky px-6 py-3 text-sm font-bold text-white">Pay with Stripe</button>
  </form>
</section>
