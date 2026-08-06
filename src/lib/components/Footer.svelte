<script lang="ts">
  import { FACEBOOK_URL, INSTAGRAM_URL, LEGAL_NAME, SERVICE_AREA } from '$lib/seo';
</script>

<footer class="border-t border-slate-200 bg-white/90">
  <div class="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-4 md:px-6">
    <section>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Program</h3>
      <ul class="mt-3 space-y-2 text-sm text-slate-700">
        <li><a class="inline-flex min-h-11 items-center hover:text-sky" href="/classes">Class offerings</a></li>
        <li><a class="inline-flex min-h-11 items-center hover:text-sky" href="/schools">Find your school</a></li>
        <li><a class="inline-flex min-h-11 items-center hover:text-sky" href="/how-it-works">How enrollment works</a></li>
      </ul>
    </section>

    <section>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Resources</h3>
      <ul class="mt-3 space-y-2 text-sm text-slate-700">
        <li><a class="inline-flex min-h-11 items-center hover:text-sky" href="/scholarship-calculator">Scholarship calculator</a></li>
        <li><a class="inline-flex min-h-11 items-center hover:text-sky" href="/act-prep-roi">Is ACT prep worth it?</a></li>
      </ul>
    </section>

    <section>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">About</h3>
      <ul class="mt-3 space-y-2 text-sm text-slate-700">
        <li><a class="inline-flex min-h-11 items-center hover:text-sky" href="/about">About the program</a></li>
        <li><a class="inline-flex min-h-11 items-center hover:text-sky" href="/classes">Upcoming ACT cram courses</a></li>
        <li><a class="inline-flex min-h-11 items-center hover:text-sky" href="/terms-and-conditions">Terms &amp; Conditions</a></li>
      </ul>
    </section>

    <section>
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Contact</h3>
      <p class="mt-3 text-sm text-slate-700">
        Questions about student fit, class dates, or scholarships? Classes are open to families across the {SERVICE_AREA}.
      </p>
      <a href="/contact" class="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-sky hover:underline">
        Send a question
      </a>
      <a
        href={FACEBOOK_URL}
        class="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-sky hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Follow KC Cram Course on Facebook
      </a>
      <a
        href={INSTAGRAM_URL}
        class="inline-flex min-h-11 items-center text-sm font-semibold text-sky hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Follow @kansascitycramcourse on Instagram
      </a>
    </section>
  </div>

  <div class="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
    &copy; {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.
  </div>
</footer>
