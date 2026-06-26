import type { CmsSection } from '$lib/types';

export const navItems = [
  { href: '/classes', label: 'Classes' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/schools', label: 'Find Your School' },
  { href: '/resources', label: 'Resources' },
  { href: '/scholarship-calculator', label: 'Scholarship Calculator' },
  { href: '/act-prep-roi', label: 'ACT Prep ROI' },
  { href: '/about', label: 'About' }
];

export const homepageSections: CmsSection[] = [
  {
    id: 'what-it-is',
    eyebrow: 'What it is',
    title: 'A four-session ACT cram course built for the week before your test.',
    body: 'Students get focused instruction in strategy, pacing, and high-yield review across the most important ACT question types in four 90-minute sessions.',
    tone: 'sky',
    ctaLabel: 'See upcoming dates',
    ctaHref: '/classes'
  },
  {
    id: 'who-its-for',
    eyebrow: 'Who it is for',
    title: 'Best for students who want structure, accountability, and a stronger test-day plan.',
    body: 'This course is designed for students who already know some of the material and need sharper timing, better decision-making, and targeted review before the ACT.',
    tone: 'sun',
    ctaLabel: 'How it works',
    ctaHref: '/how-it-works'
  },
  {
    id: 'why-it-works',
    eyebrow: 'Why it works',
    title: 'Built around real strategy, timed practice, and the most-tested skills.',
    body: 'Instead of dragging students through a long prep program, this course focuses on the highest-yield ideas, common mistake patterns, and practical systems they can use immediately on test day.',
    tone: 'ink',
    ctaLabel: 'Meet the instructor',
    ctaHref: '/about'
  },
];

export const enrollmentJourneySections: CmsSection[] = [
  {
    id: 'step-1',
    eyebrow: 'Step 1',
    title: 'Choose your ACT test date and enroll',
    body: 'Select the ACT date you are preparing for and reserve your seat in the cram course scheduled during the week leading up to that test.'
  },
  {
    id: 'step-2',
    eyebrow: 'Step 2',
    title: 'Attend four focused sessions during test week',
    body: 'Each 90-minute class covers strategy, pacing systems, and high-yield review so students know exactly how to approach each section.'
  },
  {
    id: 'step-3',
    eyebrow: 'Step 3',
    title: 'Take the ACT with a clear plan',
    body: 'Students enter test day with practiced timing, section strategies, and a structured approach they can execute under pressure.'
  }
];
