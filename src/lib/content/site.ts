import type { CmsSection } from '$lib/types';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/classes', label: 'Classes' },
  { href: '/contact', label: 'Contact' },
];

export const homepageSections: CmsSection[] = [
  {
    id: 'what-it-is',
    eyebrow: 'What it is',
    title: 'A four-session ACT cram course built for the week before your test.',
    body: 'Students get focused instruction in strategy, pacing, and high-yield review across the most important ACT question types in four 90-minute sessions.',
    ctaLabel: 'See upcoming dates',
    ctaHref: '/classes'
  },
  {
    id: 'who-its-for',
    eyebrow: 'Who it is for',
    title: 'Best for students who want structure, accountability, and a stronger test-day plan.',
    body: 'This course is designed for students who already know some of the material but need sharper timing, better decision-making, and targeted review before the ACT.',
    ctaLabel: 'How it works',
    ctaHref: '/how-it-works'
  },
  {
    id: 'why-it-works',
    eyebrow: 'Why it works',
    title: 'Built around real strategy, timed practice, and the most-tested skills.',
    body: 'Instead of dragging students through a long prep program, this course focuses on the highest-yield ideas, common mistake patterns, and practical systems they can use immediately on test day.',
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
