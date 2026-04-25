<script lang="ts">
  export let eyebrow = '';
  export let title = '';
  export let body = '';
  export let primaryCtaLabel = 'Enroll now';
  export let primaryCtaHref = '/enroll';
  export let secondaryCtaLabel = 'View classes';
  export let secondaryCtaHref = '/classes';
  export let imageSrc = '';
  export let imageAlt = '';
  export let stats: Array<{ value: string; label: string }> = [];
</script>

<section class="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_36%,#fff7ed_100%)] px-4 pb-10 pt-8 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.45)] md:px-8 md:pb-12 md:pt-10">
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="absolute -left-16 top-0 h-48 w-48 rounded-full bg-sky/15 blur-3xl"></div>
    <div class="absolute right-0 top-10 h-64 w-64 rounded-full bg-sun/20 blur-3xl"></div>
    <div class="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-clay/10 blur-3xl"></div>
  </div>

  <div class="relative grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
    <div>
      <p class="mb-4 inline-block rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 backdrop-blur">
        {eyebrow}
      </p>
      <h1 class="text-balance text-5xl font-black leading-[1.02] text-ink md:text-6xl">{title}</h1>
      <p class="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-700 md:text-xl">{body}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href={primaryCtaHref} class="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800">
          {primaryCtaLabel}
        </a>
        <a href={secondaryCtaHref} class="rounded-full border border-slate-300/80 bg-white/75 px-6 py-3 text-sm font-bold text-slate-700 backdrop-blur transition hover:border-slate-900 hover:text-slate-900">
          {secondaryCtaLabel}
        </a>
      </div>

      {#if stats.length}
        <div class="mt-8 grid gap-3 sm:grid-cols-3">
          {#each stats as stat}
            <div class="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 shadow-lg shadow-slate-900/5 backdrop-blur">
              <div class="text-2xl font-black text-ink">{stat.value}</div>
              <div class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {stat.label}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <div>
      {#if imageSrc}
        <div class="relative mx-auto max-w-md">
          <div class="overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur">
            <img src={imageSrc} alt={imageAlt} class="aspect-[4/3] w-full rounded-[1.5rem] object-cover object-center" />
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 shadow-lg shadow-slate-900/5 backdrop-blur">
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-clay">Local and personal</p>
              <p class="mt-2 text-sm font-semibold text-slate-700">
                Taught by a Kansas City high school teacher, not a faceless test-prep brand.
              </p>
            </div>

            <div class="rounded-2xl bg-ink px-4 py-4 text-white shadow-xl shadow-slate-950/20">
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Average recent gain</p>
              <p class="mt-2 text-3xl font-black">+5 to +6</p>
              <p class="mt-1 text-sm text-slate-300">points, with larger jumps for some students</p>
            </div>
          </div>
        </div>
      {:else}
        <div class="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.85),rgba(239,246,255,0.92))] p-6 shadow-2xl shadow-slate-900/15 backdrop-blur">
          <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <div class="absolute left-0 top-0 h-36 w-36 rounded-full bg-sky/20 blur-3xl"></div>
            <div class="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-sun/20 blur-3xl"></div>
          </div>

          <div class="relative">
            <div class="rounded-[1.5rem] bg-[linear-gradient(160deg,#0f172a,#1e3a8a,#0f766e)] p-6 text-white shadow-xl shadow-slate-900/20">
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Hero image placeholder</p>
              <h2 class="mt-3 text-2xl font-extrabold">Swap in students learning together</h2>
              <p class="mt-3 text-sm leading-relaxed text-slate-200">
                A wide, candid classroom or small-group study photo will work better here than a personal headshot.
              </p>

              <div class="mt-5 grid gap-3 sm:grid-cols-2">
                <div class="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                  <p class="text-xs font-bold uppercase tracking-[0.14em] text-sky-100/80">Best fit</p>
                  <p class="mt-2 text-sm font-semibold">High-school students at desks or in discussion</p>
                </div>
                <div class="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                  <p class="text-xs font-bold uppercase tracking-[0.14em] text-sky-100/80">Avoid</p>
                  <p class="mt-2 text-sm font-semibold">Corporate-looking tutoring or young-child classroom shots</p>
                </div>
              </div>
            </div>

            <div class="mt-4 grid gap-3 sm:grid-cols-3">
              <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-900/5">
                <p class="text-xs font-bold uppercase tracking-[0.14em] text-clay">English</p>
                <p class="mt-2 text-sm font-semibold text-slate-700">Pacing and passage strategy</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-900/5">
                <p class="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Math</p>
                <p class="mt-2 text-sm font-semibold text-slate-700">High-yield problem types</p>
              </div>
              <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-900/5">
                <p class="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">Reading</p>
                <p class="mt-2 text-sm font-semibold text-slate-700">Section timing under pressure</p>
              </div>
            </div>
          </div>
        </div>
      {/if}

    </div>
  </div>
</section>
