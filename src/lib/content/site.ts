import type { CmsSection } from '$lib/types';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/classes', label: 'Classes' },
  { href: '/contact', label: 'Contact' },
];

export const homepageSections: CmsSection[] = [
  {
    id: 'who-its-for',
    eyebrow: 'Who this is for',
    title: 'Students who want a clear plan for test week.',
    body: 'Best fit for motivated students who already know the basics, need structure and pacing, and want high-yield review the week before the ACT.',
    ctaLabel: 'See upcoming dates',
    ctaHref: '/classes'
  },
  {
    id: 'difference',
    eyebrow: 'What makes this different',
    title: 'A cram course built around strategy, timing, and the most-tested skills.',
    body: 'Four focused sessions: section strategy, timed practice, targeted review, and a test-day execution plan, all without dragging into a long program.',
    ctaLabel: 'How it works',
    ctaHref: '/how-it-works'
  },
  {
    id: 'credibility',
    eyebrow: 'Results & credibility',
    title: 'Teaching ACT/SAT since 2015, built for real score gains.',
    body: 'This course is designed to produce measurable improvement through repeatable pacing systems, mistake patterns, and high-frequency content review.',
    ctaLabel: 'Meet the instructor',
    ctaHref: '/about'
  },
];

export const enrollmentJourneySections: CmsSection[] = [
  {
    id: 'step-1',
    eyebrow: 'Step 1',
    title: 'Choose your ACT test date',
    body: 'Select the ACT test date you are preparing for and enroll in the cram course scheduled during the week leading up to that exam.'
  },
  {
    id: 'step-2',
    eyebrow: 'Step 2',
    title: 'Attend the four-session cram course',
    body: 'Each class includes strategy, pacing systems, and high-yield review so students walk into the test with a clear plan for every section.'
  },
  {
    id: 'step-3',
    eyebrow: 'Step 3',
    title: 'Take the ACT with confidence',
    body: 'Students approach test day with proven timing strategies, targeted practice, and a clear understanding of how to manage each section of the exam.'
  }
];
