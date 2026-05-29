<script lang="ts">
  import { LEGAL_NAME, SERVICE_AREA } from '$lib/seo';
</script>

<footer class="border-t border-slate-200 bg-white/90">
  <div class="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-4 md:px-6">
    <section>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Program</h3>
      <ul class="mt-3 space-y-2 text-sm text-slate-700">
        <li><a class="hover:text-sky" href="/classes">Class offerings</a></li>
        <li><a class="hover:text-sky" href="/schools">Find your school</a></li>
        <li><a class="hover:text-sky" href="/how-it-works">How enrollment works</a></li>
      </ul>
    </section>

    <section>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Resources</h3>
      <ul class="mt-3 space-y-2 text-sm text-slate-700">
        <li><a class="hover:text-sky" href="/scholarship-calculator">Scholarship calculator</a></li>
        <li><a class="hover:text-sky" href="/act-prep-roi">Turn scores into scholarships</a></li>
      </ul>
    </section>

    <section>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">About</h3>
      <ul class="mt-3 space-y-2 text-sm text-slate-700">
        <li><a class="hover:text-sky" href="/about">About the program</a></li>
        <li><a class="hover:text-sky" href="/classes">Upcoming ACT cram courses</a></li>
        <li><a class="hover:text-sky" href="/terms-and-conditions">Terms &amp; Conditions</a></li>
      </ul>
    </section>

    <section>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Contact</h3>
      <p class="mt-3 text-sm text-slate-700">
        Questions about fit, schedule, or scholarship strategy? We serve families across the {SERVICE_AREA}.
      </p>
      <a href="/contact" class="mt-2 block text-sm font-semibold text-sky hover:underline">
        Request more information
      </a>
    </section>
  </div>

  <div class="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
    &copy; {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.
  </div>
</footer>
