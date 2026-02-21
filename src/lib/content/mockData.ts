import type { ClassOffering, CollegeTier, School } from '$lib/types';

export const classOfferings: ClassOffering[] = [
  {
    id: 'cls-foundations',
    slug: 'foundations-8-week',
    title: 'ACT Foundations (8 Weeks)',
    schedule: 'Tuesdays + Thursdays, 6:30 PM',
    format: 'In-person',
    priceCents: 62500,
    seatsAvailable: 18,
    featured: true
  },
  {
    id: 'cls-intensive',
    slug: 'intensive-4-week',
    title: 'ACT Intensive (4 Weeks)',
    schedule: 'Mondays + Wednesdays, 7:00 PM',
    format: 'Hybrid',
    priceCents: 48500,
    seatsAvailable: 12
  },
  {
    id: 'cls-bootcamp',
    slug: 'saturday-bootcamp',
    title: 'Saturday Strategy Bootcamp',
    schedule: 'Saturdays, 9:00 AM - 1:00 PM',
    format: 'Online',
    priceCents: 21500,
    seatsAvailable: 24
  }
];

export const schools: School[] = [
  {
    id: 'sch-carmel',
    slug: 'carmel-high-school',
    name: 'Carmel High School',
    district: 'Carmel Clay Schools',
    heroImageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    shortPitch: 'Custom prep timing for Carmel students balancing AP and athletics.'
  },
  {
    id: 'sch-zionsville',
    slug: 'zionsville-community-high-school',
    name: 'Zionsville Community High School',
    district: 'Zionsville Community Schools',
    heroImageUrl: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1200&q=80',
    shortPitch: 'Score-targeted cohorts aligned with Zionsville testing timelines.'
  },
  {
    id: 'sch-fishers',
    slug: 'fishers-high-school',
    name: 'Fishers High School',
    district: 'Hamilton Southeastern Schools',
    heroImageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    shortPitch: 'High-accountability sessions and parent progress updates for Fishers families.'
  },
  {
    id: 'sch-purdue-poly',
    slug: 'purdue-polytechnic-high-school',
    name: 'Purdue Polytechnic High School',
    district: 'PPHS Network',
    heroImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    shortPitch: 'Project-based learners get concise ACT strategy and pacing frameworks.'
  }
];

export const scholarshipTiers: CollegeTier[] = [
  {
    collegeSlug: 'ball-state',
    collegeName: 'Ball State University',
    tierName: 'Cardinal Merit',
    minGpa: 3.0,
    minAct: 24,
    annualAwardUsd: 6000
  },
  {
    collegeSlug: 'ball-state',
    collegeName: 'Ball State University',
    tierName: 'Presidential Merit',
    minGpa: 3.5,
    minAct: 28,
    annualAwardUsd: 10000
  },
  {
    collegeSlug: 'ball-state',
    collegeName: 'Ball State University',
    tierName: 'Honors Distinction',
    minGpa: 3.8,
    minAct: 31,
    annualAwardUsd: 13000
  },
  {
    collegeSlug: 'iu-bloomington',
    collegeName: 'Indiana University Bloomington',
    tierName: 'Select Scholar',
    minGpa: 3.2,
    minAct: 26,
    annualAwardUsd: 5000
  },
  {
    collegeSlug: 'iu-bloomington',
    collegeName: 'Indiana University Bloomington',
    tierName: 'Dean Scholar',
    minGpa: 3.6,
    minAct: 30,
    annualAwardUsd: 9000
  },
  {
    collegeSlug: 'iu-bloomington',
    collegeName: 'Indiana University Bloomington',
    tierName: 'Provost Scholar',
    minGpa: 3.85,
    minAct: 33,
    annualAwardUsd: 13000
  },
  {
    collegeSlug: 'purdue',
    collegeName: 'Purdue University',
    tierName: 'Boilermaker Award',
    minGpa: 3.5,
    minAct: 29,
    annualAwardUsd: 6500
  },
  {
    collegeSlug: 'purdue',
    collegeName: 'Purdue University',
    tierName: 'Trustees Scholarship',
    minGpa: 3.75,
    minAct: 32,
    annualAwardUsd: 11000
  },
  {
    collegeSlug: 'purdue',
    collegeName: 'Purdue University',
    tierName: 'Presidential Scholarship',
    minGpa: 3.95,
    minAct: 34,
    annualAwardUsd: 15000
  },
  {
    collegeSlug: 'alabama',
    collegeName: 'University of Alabama',
    tierName: 'Capstone Scholar',
    minGpa: 3.5,
    minAct: 30,
    annualAwardUsd: 9000
  },
  {
    collegeSlug: 'alabama',
    collegeName: 'University of Alabama',
    tierName: 'Foundation in Excellence',
    minGpa: 3.7,
    minAct: 32,
    annualAwardUsd: 18000
  },
  {
    collegeSlug: 'alabama',
    collegeName: 'University of Alabama',
    tierName: 'Premier Award',
    minGpa: 3.9,
    minAct: 34,
    annualAwardUsd: 28000
  }
];
