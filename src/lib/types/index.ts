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
  location: string;
  format: string;
  priceCents: number;
  seatsAvailable: number;
  featured?: boolean;
  stripePriceId?: string | null;
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
  actScoreSavings: {
    tierName: string;
    targetAct: number;
    actIncrease: number;
    totalAnnualAwardUsd: number;
    additionalAnnualAwardUsd: number;
  }[];
}

export interface ScholarshipRequirementDetail {
  label: string;
  met: boolean;
}

export interface ScholarshipNextStep {
  tier_name: string;
  projected_total_usd: number;
  annual_award_usd: number;
  requires_separate_application: boolean;
  application_note: string | null;
  actGap: number;
  gpaGap: number;
  dimensionsNeeded: number;
  requirementDetails: ScholarshipRequirementDetail[];
}

export interface ScholarshipProjectionResult {
  schoolSlug: string;
  schoolName: string;
  shortName: string | null;
  sourceType: 'modeled' | 'published' | 'school-page' | 'mixed';
  sourceLabel: string;
  sourceUrl: string | null;
  primary: {
    tier_name: string;
    annual_award_usd: number;
    projected_total_usd: number;
  };
  nextSteps: ScholarshipNextStep[];
  note: string | null;
}
