import type { CmsSection } from '$lib/types';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/classes', label: 'Classes' },
  { href: '/scholarship-calculator', label: 'Scholarship Calculator' },
  { href: '/schools', label: 'Schools' },
  { href: '/resources', label: 'Resources' },
  { href: '/529-update', label: '529 Update' },
  { href: '/contact', label: 'Contact' },
  { href: '/enroll', label: 'Enroll' }
];

export const homepageSections: CmsSection[] = [
  {
    id: 'results',
    eyebrow: 'Outcome focused',
    title: 'Raise scores with a class plan that fits busy student schedules.',
    body: 'Small-group instruction, timed practice, and strategy labs designed for score jumps and confident test-day performance.',
    ctaLabel: 'View classes',
    ctaHref: '/classes'
  },
  {
    id: 'scholarships',
    eyebrow: 'Tuition strategy',
    title: 'Track scholarship potential while you prep.',
    body: 'Use the scholarship calculator to estimate offers from local and flagship schools, then see exactly what score/gpa moves unlock the next tiers.',
    ctaLabel: 'Try calculator',
    ctaHref: '/scholarship-calculator'
  },
  {
    id: 'schools',
    eyebrow: 'School-specific experience',
    title: 'Choose your high school and enroll through your dedicated page.',
    body: 'Students can select their school, see familiar visuals, and enroll in the same proven prep program through a customized path.',
    ctaLabel: 'Find your school',
    ctaHref: '/schools'
  }
];

export const enrollmentJourneySections: CmsSection[] = [
  {
    id: 'step-1',
    eyebrow: 'Step 1',
    title: 'Pick your class format',
    body: 'Decide between in-person, hybrid, or online cohorts with fixed meeting windows.'
  },
  {
    id: 'step-2',
    eyebrow: 'Step 2',
    title: 'Share student profile',
    body: 'Tell us GPA, target ACT range, and school context so we personalize guidance.'
  },
  {
    id: 'step-3',
    eyebrow: 'Step 3',
    title: 'Secure your seat',
    body: 'Submit enrollment and complete payment through Stripe checkout.'
  }
];
