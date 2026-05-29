<script lang="ts">
  import type { School } from '$lib/types';

  export let schools: School[] = [];
</script>

<section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {#each schools as school}
    {@const needsDarkLogoBackdrop =
      school.heroImageUrl.includes('FFFFFF') || school.heroImageUrl.includes('christ-preparatory-academy')}
    <a
      href={`/classes?school=${school.slug}`}
      class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={school.heroImageUrl}
        alt={school.name}
        class={`h-44 w-full object-contain p-8 ${needsDarkLogoBackdrop ? 'bg-slate-900' : 'bg-slate-50'}`}
        loading="lazy"
      />
      <div class="p-5">
        <h3 class="text-center text-xl font-black text-ink transition group-hover:text-sky">{school.name}</h3>
        <div class="mt-5 flex justify-center">
          <span
            class="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-slate-900/20 transition group-hover:bg-sky"
          >
            See class options
          </span>
        </div>
      </div>
    </a>
  {/each}
  <a
    href="/classes"
    class="group flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-sky/40 bg-sky/5 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-sky hover:bg-sky/10 hover:shadow-xl"
  >
    <div>
      <div class="flex h-44 items-center justify-center rounded-2xl bg-white">
        <div class="text-center">
          <p class="text-5xl font-black text-sky">?</p>
          <p class="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">All local families</p>
        </div>
      </div>
      <div class="pt-5">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Don't see your school?</p>
        <h3 class="mt-1 text-xl font-black text-ink transition group-hover:text-sky">We still have classes for you.</h3>
        <p class="mt-2 text-sm text-slate-600">
          Our ACT cram courses are open to families across the Kansas City area, even if your school does not have a dedicated page yet.
        </p>
      </div>
    </div>
    <p class="mt-4 text-sm font-bold text-sky">View class options</p>
  </a>
</section>
