<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
  title="About"
  description="Meet Adam Lang and learn how KC Cram Course approaches focused ACT prep, pacing strategy, and scholarship-minded score improvement."
/>

<section class="page-hero p-8 md:p-10">
  <div class="grid gap-8 md:grid-cols-2 md:items-center">

    <!-- TEXT -->
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">About the instructor</p>
      <h1 class="mt-2 text-4xl font-black text-ink md:text-5xl">Hi, I'm Adam Lang.</h1>

      <p class="mt-4 text-lg text-slate-600">
        I'm a high school teacher in Kansas City and have been
        <strong>teaching test prep since 2015</strong>. I've spent years helping high school students
        build confidence, prepare for high-stakes exams, and make complicated academic work feel manageable.
      </p>

      <p class="mt-4 text-lg text-slate-600">
        I also know the scholarship side of this process personally. When I was a student, my first ACT score left my
        dream school financially out of reach. I needed a higher score to be invited to its competitive scholarship
        competition, so I studied the ACT, learned how the test worked, and <strong>raised my score four points</strong>.
        That improvement helped me earn an invitation, win <strong>more than $100,000 in college scholarships</strong>,
        and later earn an <strong>additional $50,000 in scholarships</strong> while working on my master's degree. This
        experience is a major reason why I teach ACT prep. I understand the strategies students need to score well, and
        I also understand how life-changing score improvements like this can be.
      </p>

      <p class="mt-4 text-lg text-slate-600">
        In college, I graduated <em>summa cum laude</em> with honors. In the classroom, I was named
        <strong>Teacher of the Year</strong> at my school in 2021. I understand the content students need to know, and I
        know how to communicate it in an engaging and effective way. My style is direct, encouraging, and practical:
        students leave knowing exactly what to do differently. The results speak for themselves: My students have seen an
        <strong>average improvement of 5-6 points</strong> on the ACT over my last three years of teaching ACT Prep
        classes.
      </p>
    </div>

    <!-- IMAGE -->
    <div class="flex justify-center md:justify-end">
      <img
        src="/images/adam-lang.jpg"
        alt="Adam Lang, ACT instructor"
        class="w-full max-w-xs rounded-[1.75rem] border-4 border-white object-cover shadow-2xl shadow-slate-900/20 md:max-w-md lg:max-w-lg"
      />
    </div>

  </div>
</section>

<section class="color-card mt-8 rounded-3xl border p-6 md:p-8">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Instructor credentials</p>
  <h2 class="mt-2 text-2xl font-black text-ink">A teacher with real test-score and classroom credibility.</h2>

  <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <article class="rounded-2xl border border-sky-100 bg-white p-5">
      <p class="text-3xl font-black text-sky-800">+5-6</p>
      <p class="mt-2 text-sm font-semibold text-slate-700">
        Running three-year average composite ACT score improvement for my ACT students
      </p>
    </article>

    <article class="rounded-2xl border border-amber-100 bg-white p-5">
      <p class="text-3xl font-black text-amber-700">99th</p>
      <p class="mt-2 text-sm font-semibold text-slate-700">Percentile ACT score as a high school student</p>
    </article>

    <article class="rounded-2xl border border-teal-100 bg-white p-5">
      <p class="text-3xl font-black text-teal-700">Honors</p>
      <p class="mt-2 text-sm font-semibold text-slate-700">Graduated <em>summa cum laude</em> with honors</p>
    </article>

    <article class="rounded-2xl border border-rose-100 bg-white p-5">
      <p class="text-3xl font-black text-rose-700">2021</p>
      <p class="mt-2 text-sm font-semibold text-slate-700">
        Teacher of the Year at Augustine School, ranked in the top 5 highest achieving schools in the nation by the CLT
      </p>
    </article>
  </div>
</section>

<section class="mt-8 grid gap-5 md:grid-cols-3">
  <article class="rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-sm shadow-sky-900/5">
    <h2 class="text-xl font-extrabold text-ink">Focused preparation</h2>
    <p class="mt-3 text-sm text-slate-600">
      This is not a long tutoring program. It is a short, high-yield course built for the week before the ACT, when
      students need clarity, structure, and efficient review.
    </p>
  </article>

  <article class="rounded-2xl border border-amber-100 bg-white/95 p-6 shadow-sm shadow-amber-900/5">
    <h2 class="text-xl font-extrabold text-ink">Effective communication</h2>
    <p class="mt-3 text-sm text-slate-600">
      Students respond when strategy is clear, concrete, and easy to remember. My job is to make a complicated test
      feel manageable, especially for students who are smart but overwhelmed by timing.
    </p>
  </article>

  <article class="rounded-2xl border border-teal-100 bg-white/95 p-6 shadow-sm shadow-teal-900/5">
    <h2 class="text-xl font-extrabold text-ink">Local scholarship perspective</h2>
    <p class="mt-3 text-sm text-slate-600">
      I teach here, live here, and understand the schools, families, and college goals many Kansas City students are
      working toward. Even modest score gains can affect college options and scholarship opportunities.
    </p>
  </article>
</section>

<section class="ink-band mt-8 rounded-3xl border p-6 md:p-8">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Ready to choose a date?</p>
      <h2 class="mt-2 text-2xl font-black text-white">Reserve a seat in the week-before-test ACT course.</h2>
      <p class="mt-2 text-sm leading-relaxed text-sky-50/85">
        Compare upcoming class dates, see current seat availability, and start enrollment for the cohort that matches
        your ACT test date.
      </p>
    </div>

    <a
      href="/classes"
      use:preserveMarketingParams
      use:trackEnrollCta={{ cta_location: 'about_footer', cta_label: 'View class dates' }}
      class="inline-flex shrink-0 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-slate-100"
    >
      View class dates
    </a>
  </div>
</section>
