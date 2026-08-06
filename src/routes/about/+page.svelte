<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
  title="About"
  description="Meet Adam Lang, a Kansas City teacher who has taught ACT preparation since 2015 and used his own ACT score improvement to earn substantial college scholarships."
/>

<section class="page-hero p-8 md:p-10">
  <div class="grid gap-8 md:grid-cols-2 md:items-center">

    <!-- TEXT -->
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">About the instructor</p>
      <h1 class="mt-2 text-4xl font-black text-ink md:text-5xl">Hi, I'm Adam Lang.</h1>

      <p class="mt-4 text-lg text-slate-600">
        I'm a high school teacher in Kansas City, and I have been <strong>teaching test preparation since 2015</strong>.
      </p>

      <p class="mt-4 text-lg text-slate-600">
        I started taking the ACT seriously for a practical reason. My first score left my first-choice college
        financially out of reach. I needed two more points to qualify for its competitive scholarship program.
      </p>

      <p class="mt-4 text-lg text-slate-600">
        I started working through old tests and paying close attention to why I missed questions. Over time, I began to
        see patterns in the test and in my own mistakes. I <strong>raised my score by four points</strong>.
      </p>

      <p class="mt-4 text-lg text-slate-600">
        That improvement earned me an invitation to the scholarship competition, where I received
        <strong>more than $100,000 in college scholarships</strong>. I later earned another
        <strong>$50,000 in scholarships</strong> for my master's degree.
      </p>

      <p class="mt-4 text-lg text-slate-600">
        Those four points changed the direction of my life. They opened the door to the college I wanted to attend. I
        graduated from college debt free and have been able to pursue my master's degree without taking on student debt.
        That has been an enormous blessing to me and my family. It is also one reason I care so much about helping
        students understand what their ACT score may mean for their future.
      </p>

      <p class="mt-4 text-lg text-slate-600">
        I graduated <em>summa cum laude</em> with honors and was named <strong>Teacher of the Year</strong> at Augustine
        School in 2021. I have spent years learning how to explain difficult ideas to high school students. Over the past
        three years, students in my ACT classes have improved their composite scores by an
        <strong>average of five to six points</strong>.
      </p>
    </div>

    <!-- IMAGE -->
    <div class="flex justify-center md:justify-end">
      <img
        src="/images/adam-lang-2026.webp"
        alt="Adam Lang, ACT instructor"
        class="w-full max-w-xs rounded-[1.75rem] border-4 border-white object-cover shadow-2xl shadow-slate-900/20 md:max-w-md lg:max-w-lg"
      />
    </div>

  </div>
</section>

<section class="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
  <div class="grid gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
    <img
      src="/images/course/small-group-instruction-2026.webp"
      alt="Adam Lang helping students work through ACT prep materials in a small group"
      class="h-80 w-full object-cover object-[center_42%] lg:h-full"
      loading="lazy"
      decoding="async"
    />
    <div class="p-6 md:p-8">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Teaching style</p>
      <h2 class="mt-2 text-2xl font-black text-ink">I teach students what to do when they get stuck.</h2>
      <p class="mt-3 text-sm leading-6 text-slate-700">
        A student may know how to solve a math problem and spend too long trying to make it come together. A strong
        reader may keep returning to the same paragraph without knowing what to look for. After several difficult
        questions, a student may begin rushing through questions they could have answered.
      </p>
      <p class="mt-3 text-sm leading-6 text-slate-700">
        These are problems students can learn to handle. In class, we talk plainly about when to move on, what to write
        down, how to narrow the choices, and how to recover after losing time.
      </p>
    </div>
  </div>
</section>

<section class="color-card mt-8 rounded-3xl border p-6 md:p-8">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Instructor credentials</p>
  <h2 class="mt-2 text-2xl font-black text-ink">Why I'm qualified to teach this course</h2>

  <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <article class="rounded-2xl border border-sky-100 bg-white p-5">
      <p class="text-3xl font-black text-sky-800">+5-6</p>
      <p class="mt-2 text-sm font-semibold text-slate-700">
        Average composite improvement among my ACT students over the past three years
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
    <h2 class="text-xl font-extrabold text-ink">Four classes during ACT week</h2>
    <p class="mt-3 text-sm text-slate-600">
      The course concentrates on the mistakes, timing problems, and decisions that are most likely to matter on the
      upcoming test.
    </p>
  </article>

  <article class="rounded-2xl border border-amber-100 bg-white/95 p-6 shadow-sm shadow-amber-900/5">
    <h2 class="text-xl font-extrabold text-ink">Explanations students can remember</h2>
    <p class="mt-3 text-sm text-slate-600">
      I explain each strategy in concrete terms and give students time to practice it. By Saturday, the process should
      feel familiar enough to use without a teacher beside them.
    </p>
  </article>

  <article class="rounded-2xl border border-teal-100 bg-white/95 p-6 shadow-sm shadow-teal-900/5">
    <h2 class="text-xl font-extrabold text-ink">Scholarships are part of the conversation</h2>
    <p class="mt-3 text-sm text-slate-600">
      I teach in Kansas City and pay attention to the scholarship programs families here are considering. Scholarship
      decisions vary by school, but families should know when another point or two may affect the cost of college.
    </p>
  </article>
</section>

<section class="ink-band mt-8 rounded-3xl border p-6 md:p-8">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Upcoming classes</p>
      <h2 class="mt-2 text-2xl font-black text-white">Find the class scheduled for your ACT date.</h2>
      <p class="mt-2 text-sm leading-relaxed text-sky-50/85">
        The course meets during the week leading up to each listed ACT. View the schedule, check the remaining seats,
        and choose the test date your student is preparing for.
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
