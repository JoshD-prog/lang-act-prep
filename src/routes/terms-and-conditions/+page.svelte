<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';

  const lastUpdated = 'March 31, 2026';

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      body: [
        'By enrolling in any course, purchasing access to any service, or using this website, you agree to be bound by these Terms & Conditions. If you do not agree, do not use this website or enroll in a course.'
      ]
    },
    {
      id: 'services',
      title: '2. Services Provided',
      body: [
        'KC Cram Course provides standardized test preparation services, including ACT and SAT review courses, practice materials, instruction, and related educational resources.',
        'KC Cram Course is an independent educational business and is not affiliated with, endorsed by, or sponsored by ACT, Inc., the College Board, or any school, district, or testing organization unless explicitly stated.'
      ]
    },
    {
      id: 'enrollment-payment',
      title: '3. Enrollment and Payment',
      list: [
        'Enrollment is confirmed only after full payment is successfully received.',
        'Payments may be processed through third-party payment providers such as Stripe.',
        'Prices are listed on the website and may be updated at any time before purchase.',
        'Seats are limited and are reserved on a first-come, first-served basis.',
        'A submitted enrollment form does not guarantee a seat unless payment is completed and confirmation is issued.'
      ]
    },
    {
      id: 'refund-policy',
      title: '4. Refund Policy',
      list: [
        'Full refunds are available up to 30 days before the first session.',
        'Partial refunds or transferred enrollments may be issued at the sole discretion of KC Cram Course after that deadline.',
        'No refunds will be issued once the course has begun, except in extraordinary circumstances determined by KC Cram Course.',
        'If KC Cram Course cancels a course and does not provide a reasonable substitute or transfer option, a full refund will be issued.'
      ]
    },
    {
      id: 'attendance',
      title: '5. Attendance and Participation',
      list: [
        'Students are responsible for attending scheduled sessions on time.',
        'Missed sessions are not guaranteed to be rescheduled, replaced, or refunded.',
        'Students are expected to behave respectfully toward instructors, staff, and other students.',
        'KC Cram Course reserves the right to remove any student for disruptive, unsafe, or inappropriate behavior without refund.'
      ]
    },
    {
      id: 'score-guarantee',
      title: '6. No Score Guarantee',
      body: [
        'KC Cram Course does not guarantee any specific score increase, percentile, admission result, scholarship award, or other testing outcome.',
        'Student outcomes depend on many factors, including prior preparation, attendance, effort, health, timing, and test-day conditions outside the control of KC Cram Course.'
      ]
    },
    {
      id: 'intellectual-property',
      title: '7. Intellectual Property',
      list: [
        'All course materials, slides, handouts, drills, worksheets, recordings, strategy guides, and website content are the property of KC Cram Course unless otherwise noted.',
        'Materials are provided for personal educational use only by the enrolled student or purchasing family.',
        'Materials may not be copied, reproduced, uploaded, distributed, published, sold, sublicensed, or shared outside the scope of the purchased course without prior written permission.'
      ]
    },
    {
      id: 'liability',
      title: '8. Limitation of Liability',
      body: [
        'To the fullest extent permitted by law, KC Cram Course shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of this website, participation in a course, or reliance on any educational material provided.',
        'KC Cram Course is not responsible for college admissions decisions, scholarship decisions, official testing errors, score reporting issues, or other third-party decisions or events.'
      ]
    },
    {
      id: 'health-safety',
      title: '9. Health and Safety (In-Person Courses)',
      list: [
        'Students and families agree to follow all venue policies, posted rules, and reasonable instructor or staff directions.',
        'KC Cram Course is not responsible for illness, injury, lost property, stolen property, or damage to personal belongings except where required by law.',
        'Parents and guardians remain responsible for student transportation, supervision outside scheduled class time, and relevant medical or emergency disclosures.'
      ]
    },
    {
      id: 'privacy',
      title: '10. Privacy',
      body: [
        'KC Cram Course may collect limited personal information necessary for enrollment, communication, payment processing, scheduling, and course delivery.',
        'Payment information is processed by third-party payment providers and is not stored directly by KC Cram Course except as reflected in transaction records made available through those providers.',
        'KC Cram Course does not sell or share personal information.'
      ]
    },
    {
      id: 'changes-to-services',
      title: '11. Changes to Services',
      list: [
        'Modify course dates, times, instructors, curriculum emphasis, or delivery format;',
        'Substitute instructors when reasonably necessary;',
        'Update website content, pricing, or policies; and',
        'Cancel or combine sections when enrollment, logistics, or safety concerns require it.'
      ],
      lead: 'KC Cram Course reserves the right to:'
    },
    {
      id: 'governing-law',
      title: '12. Governing Law',
      body: [
        'These Terms & Conditions shall be governed by and construed in accordance with the laws of the State of Kansas, without regard to conflict of law principles.'
      ]
    },
    {
      id: 'contact',
      title: '13. Contact Information',
      body: [
        'Questions regarding these Terms & Conditions may be directed to KC Cram Course using the contact information listed on this website.'
      ]
    },
    {
      id: 'media-release',
      title: '14. Photo and Media Release',
      list: [
        'By attending KC Cram Course sessions, you grant permission for KC Cram Course to capture photographs, video, or other media during classes.',
        'These materials may be used for marketing, advertising, or promotional purposes, including use on the website, social media, digital ads, and print materials.',
        'No compensation will be provided for such use.',
        'Students will not be identified by full name without additional consent.'
      ],
      body: [
        'If you do not wish to be photographed or recorded, you must notify KC Cram Course in writing before the first session. KC Cram Course will make reasonable efforts to accommodate that request, but cannot guarantee that incidental capture will never occur in a group setting.'
      ]
    },
    {
      id: 'waitlist-transfer',
      title: '15. Waitlist and Seat Transfer Policy',
      subsections: [
        {
          title: 'Waitlist',
          list: [
            'If a course reaches capacity, students may join a waitlist by contacting K3C.',
            'If a seat becomes available, waitlisted families may be contacted in an order reasonably determined by KC Cram Course.',
            'A seat offer must be accepted and paid within the stated deadline or the seat may be offered to another student.'
          ]
        },
        {
          title: 'Seat Transfers',
          list: [
            'Enrollment may be transferred to another student only with prior written approval from KC Cram Course.',
            'Transfers should be requested before the first session unless KC Cram Course approves otherwise.',
            'The original purchaser is responsible for any private payment arrangement between families unless KC Cram Course expressly agrees to handle the adjustment.',
            'KC Cram Course reserves the right to deny a transfer request when necessary for roster accuracy, academic fit, logistics, or fairness.'
          ]
        }
      ]
    },
    {
      id: 'force-majeure',
      title: '16. Force Majeure',
      body: [
        'KC Cram Course shall not be liable for any delay, disruption, or failure to perform caused by events beyond its reasonable control, including severe weather, natural disaster, fire, power outage, internet outage, facility closure, public health emergency, labor disruption, governmental action, or other emergency conditions. In such cases, K3C may:'
      ],
      list: [
        'Reschedule sessions;',
        'Move sessions online;',
        'Provide transfer options or substitute services; or',
        'Make other reasonable operational adjustments.'
      ],
      closing: 'Refunds in these situations are not guaranteed and will be handled at the discretion of KC Cram Course unless otherwise required by law.'
    }
  ];
</script>

<Seo
  title="Terms and Conditions"
  description="Read the Terms & Conditions for KC Cram Course, including enrollment, refunds, attendance, media release, seat transfer, and force majeure policies."
/>

<div class="bg-white">
  <section class="border-b border-slate-200/80 bg-slate-50/80">
    <div class="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Policies</p>
      <h1 class="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Terms &amp; Conditions
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
        Please review these terms before enrolling in a KC Cram Course class or using this website.
      </p>
      <p class="mt-3 text-sm text-slate-500">Last updated: {lastUpdated}</p>
    </div>
  </section>

  <section class="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-14">
    <aside class="hidden lg:block">
      <div class="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm font-semibold text-slate-900">On this page</p>
        <nav class="mt-4 space-y-2">
          {#each sections as section}
            <a
              href={`#${section.id}`}
              class="block text-sm leading-6 text-slate-600 transition hover:text-slate-900"
            >
              {section.title}
            </a>
          {/each}
        </nav>
      </div>
    </aside>

    <article class="min-w-0">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <div class="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-p:text-slate-700 prose-li:text-slate-700">
          {#each sections as section}
            <section id={section.id} class="not-prose border-b border-slate-200/80 py-8 first:pt-0 last:border-b-0 last:pb-0">
              <h2 class="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>

              {#if section.lead}
                <p class="mt-4 text-base leading-7 text-slate-700">{section.lead}</p>
              {/if}

              {#if section.body}
                {#each section.body as paragraph}
                  <p class="mt-4 text-base leading-7 text-slate-700">{paragraph}</p>
                {/each}
              {/if}

              {#if section.list}
                <ul class="mt-4 space-y-3 pl-6 text-base leading-7 text-slate-700">
                  {#each section.list as item}
                    <li class="list-disc">{item}</li>
                  {/each}
                </ul>
              {/if}

              {#if section.subsections}
                <div class="mt-6 space-y-6">
                  {#each section.subsections as subsection}
                    <div>
                      <h3 class="text-lg font-semibold text-slate-900">{subsection.title}</h3>
                      <ul class="mt-3 space-y-3 pl-6 text-base leading-7 text-slate-700">
                        {#each subsection.list as item}
                          <li class="list-disc">{item}</li>
                        {/each}
                      </ul>
                    </div>
                  {/each}
                </div>
              {/if}

              {#if section.closing}
                <p class="mt-4 text-base leading-7 text-slate-700">{section.closing}</p>
              {/if}
            </section>
          {/each}
        </div>
      </div>
    </article>
  </section>
</div>
