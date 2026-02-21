export type ResourceAudience = 'parents' | 'educators';

export interface CmsSection {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ClassOffering {
  id: string;
  slug: string;
  title: string;
  schedule: string;
  format: string;
  priceCents: number;
  seatsAvailable: number;
  featured?: boolean;
}

export interface School {
  id: string;
  slug: string;
  name: string;
  district?: string;
  heroImageUrl: string;
  shortPitch: string;
}

export interface CollegeTier {
  collegeSlug: string;
  collegeName: string;
  tierName: string;
  minGpa: number;
  minAct: number;
  annualAwardUsd: number;
}

export interface ScholarshipProjection {
  collegeName: string;
  qualifiedTier?: CollegeTier;
  nextTiers: CollegeTier[];
}
