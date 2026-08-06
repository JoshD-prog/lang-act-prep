import type { CmsSection } from '$lib/types';

export const navItems = [
  { href: '/classes', label: 'Classes' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/schools', label: 'Find Your School' },
  { href: '/resources', label: 'Resources' },
  { href: '/scholarship-calculator', label: 'Scholarship Calculator' },
  { href: '/act-prep-roi', label: 'Is ACT Prep Worth It?' },
  { href: '/about', label: 'About' }
];

export const homepageSections: CmsSection[] = [
  {
    id: 'what-it-is',
    eyebrow: 'What it is',
    title: 'Four classes built around the decisions students make while the clock is running.',
    body: 'Students work through real ACT questions and practice how to handle them. We cover when to keep working, when to move on, how to recover lost time, and how to recognize common traps.',
    tone: 'sky',
    ctaLabel: 'See upcoming dates',
    ctaHref: '/classes'
  },
  {
    id: 'who-its-for',
    eyebrow: 'Who it is for',
    title: 'For students who know more than their score is showing.',
    body: 'This course is a good fit for students who understand much of the material but work too slowly, get stuck, misread questions, or approach each practice test differently.',
    tone: 'sun',
    ctaLabel: 'How it works',
    ctaHref: '/how-it-works'
  },
  {
    id: 'why-it-works',
    eyebrow: 'Why it works',
    title: 'The ACT tests how well students make decisions under time pressure.',
    body: 'Students need to recognize which questions deserve more time, which details matter, and when it is time to make the best choice they can and move forward.',
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
    title: 'Attend four classes during test week',
    body: 'Each 90-minute class gives students time to work through ACT questions, practice their timing, and learn what to do when they get stuck.'
  },
  {
    id: 'step-3',
    eyebrow: 'Step 3',
    title: 'Use what you practiced on test day',
    body: 'Students take the ACT a few days after the course, with recent practice handling each section and making decisions when time is short.'
  }
];
