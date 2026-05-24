import type { ScholarshipNextStep, ScholarshipProjectionResult } from '$lib/types';

export type ScholarshipRoiTarget = ScholarshipNextStep & {
  additionalFourYearValue: number;
};

export type TopNearbyOpportunity = {
  schoolSlug: string;
  schoolName: string;
  tierName: string;
  actGap: number;
  additionalFourYearValue: number;
};

export function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

export function getSourceBadgeClasses(sourceType: ScholarshipProjectionResult['sourceType']) {
  if (sourceType === 'modeled') {
    return 'border-slate-200 bg-white text-slate-600';
  }

  if (sourceType === 'school-page') {
    return 'border-slate-200 bg-white text-slate-600';
  }

  return 'border-slate-200 bg-white text-slate-600';
}

export function getTierDisplayName(
  tier: ScholarshipNextStep | null | undefined,
  currentTierName?: string
) {
  if (!tier) return '';
  if (currentTierName && tier.tier_name === currentTierName) {
    return `Higher band within ${tier.tier_name}`;
  }
  return tier.tier_name;
}

export function isCompetitiveNoThresholdTarget(tier: ScholarshipNextStep | null | undefined) {
  return Boolean(
    tier?.is_competitive &&
      tier.actGap === 0 &&
      tier.gpaGap === 0 &&
      tier.requirementDetails.every((detail) =>
        /no .* threshold published|not used for this award/i.test(detail.label)
      )
  );
}

export function isGpaOnlyAutomaticTarget(tier: ScholarshipNextStep | null | undefined) {
  return Boolean(
    tier &&
      !tier.is_competitive &&
      tier.classificationBadges.includes('GPA-based') &&
      !tier.classificationBadges.includes('ACT-based') &&
      !tier.classificationBadges.includes('GPA + ACT')
  );
}

export function getLaterTierBadge(tier: ScholarshipNextStep) {
  if (isCompetitiveNoThresholdTarget(tier)) {
    return 'Competitive';
  }

  if (tier.dimensionsNeeded <= 1 && tier.actGap > 0 && tier.actGap <= 2) {
    return 'Nearby upside';
  }

  if (tier.dimensionsNeeded <= 1) {
    return 'Score-driven';
  }

  return 'Longer-range';
}

export function getRoiTarget(
  nextSteps: ScholarshipNextStep[],
  currentFourYearValue: number,
  featuredNext?: ScholarshipNextStep
): ScholarshipRoiTarget | null {
  const stepsToEvaluate = featuredNext ? [featuredNext, ...nextSteps.slice(1)] : nextSteps;
  const candidates = stepsToEvaluate
    .filter((step) => step.actGap > 0 && step.actGap <= 4)
    .map((step) => ({
      ...step,
      additionalFourYearValue: step.projected_total_usd - currentFourYearValue
    }))
    .filter((step) => step.additionalFourYearValue > 0);

  if (!candidates.length) {
    return null;
  }

  return [...candidates].sort((a, b) => {
    if (a.additionalFourYearValue !== b.additionalFourYearValue) {
      return b.additionalFourYearValue - a.additionalFourYearValue;
    }

    const aActOnly = a.gpaGap === 0 ? 0 : 1;
    const bActOnly = b.gpaGap === 0 ? 0 : 1;
    if (aActOnly !== bActOnly) return aActOnly - bActOnly;

    if (a.actGap !== b.actGap) return a.actGap - b.actGap;

    if (a.dimensionsNeeded !== b.dimensionsNeeded) {
      return a.dimensionsNeeded - b.dimensionsNeeded;
    }

    return a.projected_total_usd - b.projected_total_usd;
  })[0];
}

export function getRoiOpportunity(roiTarget: ScholarshipRoiTarget | null) {
  if (!roiTarget) {
    return {
      target: null,
      showStrongCta: false,
      showSoftMessage: false,
      showNearbyValue: false
    };
  }

  const isActOnly = roiTarget.actGap > 0 && roiTarget.gpaGap === 0;
  const isCloseActLift = roiTarget.actGap > 0 && roiTarget.actGap <= 2;
  const isHighValueJump = roiTarget.additionalFourYearValue >= 8000;
  const isModerateValueJump = roiTarget.additionalFourYearValue >= 4000;

  return {
    target: roiTarget,
    showStrongCta: isActOnly && isCloseActLift && isHighValueJump,
    showSoftMessage: !isActOnly && roiTarget.dimensionsNeeded === 2 && isModerateValueJump,
    showNearbyValue: roiTarget.actGap <= 4
  };
}

export function getSourceHref(sourceUrl: string | null) {
  if (!sourceUrl) return null;

  if (/^https?:\/\//i.test(sourceUrl)) {
    return sourceUrl;
  }

  return `https://${sourceUrl}`;
}

export function getRequirementStatusLabel(detail: { label: string; met: boolean }) {
  if (/not used for this award/i.test(detail.label)) {
    return 'Not required';
  }

  return detail.met ? 'Already covered' : 'Needs attention';
}

export function getRequirementMetricLabel(detail: { label: string }) {
  if (detail.label.startsWith('ACT:')) return 'ACT';
  if (detail.label.startsWith('GPA:')) return 'GPA';
  return 'Rule';
}

export function getRequirementValueLabel(detail: { label: string }) {
  return detail.label.replace(/^(ACT|GPA):\s*/, '');
}

export function hasScoreBasedTarget(nextSteps: ScholarshipNextStep[]) {
  return nextSteps.some((step) => step.actGap > 0);
}

export function getTargetBadges(tier: ScholarshipNextStep) {
  return [...tier.classificationBadges, tier.residencyBadge].filter(
    (badge): badge is string => Boolean(badge)
  );
}

export function getNearbyScoreTargets(
  nextSteps: ScholarshipNextStep[],
  currentFourYearValue: number
): ScholarshipRoiTarget[] {
  return nextSteps
    .map((step) => ({
      ...step,
      additionalFourYearValue: step.projected_total_usd - currentFourYearValue
    }))
    .filter((step) => step.actGap > 0 && step.actGap <= 4 && step.additionalFourYearValue > 0)
    .sort((a, b) => {
      if (a.actGap !== b.actGap) return a.actGap - b.actGap;
      if (a.additionalFourYearValue !== b.additionalFourYearValue) {
        return b.additionalFourYearValue - a.additionalFourYearValue;
      }
      return a.projected_total_usd - b.projected_total_usd;
    })
    .slice(0, 3);
}

export function getTopNearbyOpportunities(
  projections: ScholarshipProjectionResult[]
): TopNearbyOpportunity[] {
  const rankedOpportunities = projections
    .flatMap((school) =>
      getNearbyScoreTargets(school.nextSteps, school.primary.projected_total_usd).map((target) => ({
        schoolSlug: school.schoolSlug,
        schoolName: school.shortName ?? school.schoolName,
        tierName: getTierDisplayName(target, school.primary.tier_name),
        actGap: target.actGap,
        additionalFourYearValue: target.additionalFourYearValue
      }))
    )
    .sort((a, b) => {
      if (a.additionalFourYearValue !== b.additionalFourYearValue) {
        return b.additionalFourYearValue - a.additionalFourYearValue;
      }

      if (a.actGap !== b.actGap) return a.actGap - b.actGap;

      return a.schoolName.localeCompare(b.schoolName);
    });

  const bestBySchool = new Map<string, (typeof rankedOpportunities)[number]>();

  for (const opportunity of rankedOpportunities) {
    if (!bestBySchool.has(opportunity.schoolSlug)) {
      bestBySchool.set(opportunity.schoolSlug, opportunity);
    }
  }

  return [...bestBySchool.values()].slice(0, 3);
}

export function formatUpdatedDate(value: string | null) {
  if (!value) return null;

  const [year, month] = value.split('-');
  const parsedYear = Number(year);
  const parsedMonth = Number(month);

  if (!parsedYear || !parsedMonth) return null;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(parsedYear, parsedMonth - 1, 1)));
}
