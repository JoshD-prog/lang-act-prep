import { classOfferings, scholarshipTiers, schools } from '$lib/content/mockData';
import type {
  ClassOffering,
  School,
  ScholarshipProjectionResult,
  ScholarshipRequirementDetail
} from '$lib/types';
import { createAdminSupabaseClient } from '$lib/server/supabase';
import { getStripeCheckoutConfig } from '$lib/server/stripe';

type ScholarshipTierRow = {
  school_slug: string;
  school_name: string;
  short_name: string | null;
  bucket_default: boolean;
  bucket_local: boolean;
  bucket_best_value: boolean;
  sort_priority_default: number | null;
  sort_priority_local: number | null;
  sort_priority_best_value: number | null;
  tier_name: string;
  tier_rank: number;
  min_unweighted_gpa: number | null;
  max_unweighted_gpa: number | null;
  min_act: number | null;
  max_act: number | null;
  annual_award_usd: number;
  years_assumed: number;
  projected_total_usd: number;
  residency_rule_type: string;
  eligible_states: string[] | null;
  regional_rule_note: string | null;
  requires_full_time: boolean;
  requires_separate_application: boolean;
  application_note: string | null;
  renewable: boolean;
  renewal_note: string | null;
  source_url: string | null;
  source_note: string | null;
  scholarship_page_url?: string | null;
  school_notes_short?: string | null;
  is_competitive?: boolean | null;
  tier_last_updated: string | null;
  school_last_updated: string | null;
};

type CalculatorInput = {
  gpa: number;
  act: number;
  residency: string;
  filter: string;
  tiers: ScholarshipTierRow[];
};

type BoundState = 'below_band' | 'within_band' | 'above_band';

type EvaluatedTier = ScholarshipTierRow & {
  gpaState: BoundState;
  actState: BoundState;
  isQualified: boolean;
  isReachable: boolean;
  gpaGap: number;
  actGap: number;
  dimensionsNeeded: number;
  improvementScore: number;
  requirementDetails: ScholarshipRequirementDetail[];
};

function normalizeEligibleStates(value: string[] | string | null | undefined): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .flatMap((item) =>
        String(item)
          .replace(/[{}]/g, '')
          .split(',')
      )
      .map((item) => item.trim().toUpperCase())
      .filter(Boolean);
  }

  return String(value)
    .replace(/[{}]/g, '')
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
}
function normalizeResidencyInput(residency: string) {
  const value = residency.trim().toUpperCase();

  const stateMap: Record<string, string> = {
    MISSOURI: 'MO',
    KANSAS: 'KS',
    NEBRASKA: 'NE',
    ARKANSAS: 'AR',
    OKLAHOMA: 'OK',
    IOWA: 'IA',
    ILLINOIS: 'IL',
    TENNESSEE: 'TN',
    KENTUCKY: 'KY'
  };

  return stateMap[value] ?? value;
}
function matchesResidency(tier: ScholarshipTierRow, residency: string) {
  const normalizedResidency = normalizeResidencyInput(residency);
  const states = normalizeEligibleStates(tier.eligible_states);

  if (tier.residency_rule_type === 'all_students') return true;

  if (tier.residency_rule_type === 'specific_states') {
    return states.includes(normalizedResidency);
  }

  if (tier.residency_rule_type === 'in_state') {
    return states.includes(normalizedResidency);
  }

  if (tier.residency_rule_type === 'out_of_state') {
    return !states.includes(normalizedResidency);
  }

  if (tier.residency_rule_type === 'regional') {
    return states.includes(normalizedResidency);
  }

  if (tier.residency_rule_type === 'metro_exception') {
    return states.includes(normalizedResidency);
  }

  return true;
}

function matchesFilter(tier: ScholarshipTierRow, filter: string) {
  if (filter === 'local') return tier.bucket_local;
  return true;
}

function getPathScore(tier: { gpaGap: number; actGap: number }) {
  return tier.actGap + tier.gpaGap * 10;
}

function isDominatedPath(
  candidate: { min_unweighted_gpa: number | null; min_act: number | null },
  other: { min_unweighted_gpa: number | null; min_act: number | null }
) {
  const candidateGpa = candidate.min_unweighted_gpa ?? 0;
  const candidateAct = candidate.min_act ?? 0;
  const otherGpa = other.min_unweighted_gpa ?? 0;
  const otherAct = other.min_act ?? 0;

  const sameOrHarderGpa = candidateGpa >= otherGpa;
  const sameOrHarderAct = candidateAct >= otherAct;
  const strictlyHarderInOne = candidateGpa > otherGpa || candidateAct > otherAct;

  return sameOrHarderGpa && sameOrHarderAct && strictlyHarderInOne;
}

function getBoundState(value: number, min: number | null, max: number | null): BoundState {
  if (min != null && value < min) return 'below_band';
  if (max != null && value > max) return 'above_band';
  return 'within_band';
}

function formatActRequirement(tier: ScholarshipTierRow, actState: BoundState, actGap: number) {
  if (actState === 'below_band') {
    if (tier.min_act == null) return 'ACT: improve score';
    return `ACT: increase to ${tier.min_act} (+${actGap})`;
  }

  if (tier.min_act != null && tier.max_act != null) {
    return `ACT: already in range (${tier.min_act}-${tier.max_act})`;
  }

  if (tier.min_act != null) {
    return `ACT: already meets ${tier.min_act}+`;
  }

  return 'ACT: no score threshold published';
}

function formatGpaRequirement(tier: ScholarshipTierRow, gpaState: BoundState, gpaGap: number) {
  if (gpaState === 'below_band') {
    if (tier.min_unweighted_gpa == null) return 'GPA: improve GPA';
    return `GPA: increase to ${tier.min_unweighted_gpa.toFixed(2)} (+${gpaGap.toFixed(2)})`;
  }

  if (tier.min_unweighted_gpa != null && tier.max_unweighted_gpa != null) {
    return `GPA: already in range (${tier.min_unweighted_gpa.toFixed(2)}-${tier.max_unweighted_gpa.toFixed(2)})`;
  }

  if (tier.min_unweighted_gpa != null) {
    return `GPA: already meets ${tier.min_unweighted_gpa.toFixed(2)}+`;
  }

  return 'GPA: no GPA threshold published';
}

function evaluateTier(tier: ScholarshipTierRow, gpa: number, act: number): EvaluatedTier {
  const gpaState = getBoundState(gpa, tier.min_unweighted_gpa, tier.max_unweighted_gpa);
  const actState = getBoundState(act, tier.min_act, tier.max_act);
  const gpaGap =
    gpaState === 'below_band' && tier.min_unweighted_gpa != null
      ? Number((tier.min_unweighted_gpa - gpa).toFixed(2))
      : 0;
  const actGap =
    actState === 'below_band' && tier.min_act != null
      ? tier.min_act - act
      : 0;
  const isQualified = gpaState === 'within_band' && actState === 'within_band';
  const isReachable = gpaState !== 'above_band' && actState !== 'above_band';
  const dimensionsNeeded = (actGap > 0 ? 1 : 0) + (gpaGap > 0 ? 1 : 0);
  const requirementDetails: ScholarshipRequirementDetail[] = [
    {
      label: formatActRequirement(tier, actState, actGap),
      met: actState !== 'below_band'
    },
    {
      label: formatGpaRequirement(tier, gpaState, gpaGap),
      met: gpaState !== 'below_band'
    }
  ];

  return {
    ...tier,
    gpaState,
    actState,
    isQualified,
    isReachable,
    gpaGap,
    actGap,
    dimensionsNeeded,
    improvementScore: isReachable ? getPathScore({ gpaGap, actGap }) : Number.POSITIVE_INFINITY,
    requirementDetails
  };
}

function comparePreferredPaths(a: EvaluatedTier, b: EvaluatedTier) {
  const aActOnly = a.actGap > 0 && a.gpaGap === 0 ? 0 : 1;
  const bActOnly = b.actGap > 0 && b.gpaGap === 0 ? 0 : 1;
  if (aActOnly !== bActOnly) return aActOnly - bActOnly;

  if (a.dimensionsNeeded !== b.dimensionsNeeded) {
    return a.dimensionsNeeded - b.dimensionsNeeded;
  }

  const actGapDiff = a.actGap - b.actGap;
  if (actGapDiff !== 0) return actGapDiff;

  const gpaGapDiff = a.gpaGap - b.gpaGap;
  if (gpaGapDiff !== 0) return gpaGapDiff;

  if (a.improvementScore !== b.improvementScore) {
    return a.improvementScore - b.improvementScore;
  }

  return a.tier_rank - b.tier_rank;
}

function getSortPriority(tier: ScholarshipTierRow, filter: string) {
  if (filter === 'local') return tier.sort_priority_local;
  if (filter === 'best') return tier.sort_priority_best_value;
  return tier.sort_priority_default;
}

function getUpsideValue(result: ScholarshipProjectionResult) {
  return result.nextSteps.reduce((max, step) => {
    return Math.max(max, step.projected_total_usd - result.primary.projected_total_usd);
  }, 0);
}

function getNearbyUpsideProfile(result: ScholarshipProjectionResult) {
  return result.nextSteps
    .filter((step) => step.actGap > 0 && step.actGap <= 4)
    .map((step) => ({
      upside: step.projected_total_usd - result.primary.projected_total_usd,
      actGap: step.actGap,
      dimensionsNeeded: step.dimensionsNeeded,
      actOnly: step.gpaGap === 0 ? 1 : 0
    }))
    .sort((a, b) => {
      if (a.upside !== b.upside) return b.upside - a.upside;
      if (a.actOnly !== b.actOnly) return b.actOnly - a.actOnly;
      if (a.actGap !== b.actGap) return a.actGap - b.actGap;
      return a.dimensionsNeeded - b.dimensionsNeeded;
    })[0] ?? {
      upside: 0,
      actGap: Number.POSITIVE_INFINITY,
      dimensionsNeeded: Number.POSITIVE_INFINITY,
      actOnly: 0
    };
}

function getClosestActGap(result: ScholarshipProjectionResult) {
  const actGaps = result.nextSteps
    .map((step) => step.actGap)
    .filter((gap) => gap > 0);

  return actGaps.length ? Math.min(...actGaps) : Number.POSITIVE_INFINITY;
}

function getClosestSimpleStep(result: ScholarshipProjectionResult) {
  return result.nextSteps.reduce(
    (best, step) => {
      const candidate = {
        dimensionsNeeded: step.dimensionsNeeded,
        actGap: step.actGap > 0 ? step.actGap : Number.POSITIVE_INFINITY,
        upside: step.projected_total_usd - result.primary.projected_total_usd
      };

      if (candidate.dimensionsNeeded < best.dimensionsNeeded) return candidate;
      if (candidate.dimensionsNeeded > best.dimensionsNeeded) return best;
      if (candidate.actGap < best.actGap) return candidate;
      if (candidate.actGap > best.actGap) return best;
      if (candidate.upside > best.upside) return candidate;
      return best;
    },
    {
      dimensionsNeeded: Number.POSITIVE_INFINITY,
      actGap: Number.POSITIVE_INFINITY,
      upside: 0
    }
  );
}

function getCurrentOfferProfile(result: ScholarshipProjectionResult) {
  return {
    currentValue: result.primary.projected_total_usd,
    yearlyValue: result.primary.annual_award_usd,
    nearbyUpside: getNearbyUpsideProfile(result).upside,
    closestGap: getClosestActGap(result)
  };
}

function getSchoolNote(
  schoolTiers: ScholarshipTierRow[],
  act: number
) {
  const schoolName = schoolTiers[0]?.school_name ?? '';

  if (schoolName === 'Missouri University of Science and Technology') {
    return 'Missouri S&T does not publish fixed automatic scholarship cutoffs. These results are estimates based on recent merit patterns and should be treated as directional, not official.';
  }

  const sharedNote =
    schoolTiers.find((tier) => tier.source_note)?.source_note ??
    schoolTiers.find((tier) => tier.school_notes_short)?.school_notes_short;

  if (
    sharedNote &&
    !/(automatic|official|freshman|in-state|out-of-state|nonresident|merit|scholarship|table|chart|grid)/i.test(
      sharedNote.trim()
    )
  ) {
    return sharedNote;
  }

  const hasCompetitiveScholarships = schoolTiers.some((tier) => tier.is_competitive);
  if (hasCompetitiveScholarships && act >= 32) {
    return 'Students with stronger ACT scores may also want to explore competitive scholarships beyond the automatic tiers shown here.';
  }

  return null;
}

function getSourceMeta(schoolTiers: ScholarshipTierRow[]) {
  const schoolName = schoolTiers[0]?.school_name ?? '';
  const hasSourceUrl = schoolTiers.some((tier) => Boolean(tier.source_url));
  const hasScholarshipPage = schoolTiers.some((tier) => Boolean(tier.scholarship_page_url));

  if (schoolName === 'Missouri University of Science and Technology') {
    return {
      sourceType: 'modeled' as const,
      sourceLabel: 'Modeled estimate',
      sourceUrl:
        schoolTiers.find((tier) => tier.scholarship_page_url)?.scholarship_page_url ??
        schoolTiers.find((tier) => tier.source_url)?.source_url ??
        null
    };
  }

  if (hasSourceUrl && hasScholarshipPage) {
    return {
      sourceType: 'mixed' as const,
      sourceLabel: 'Published scholarship data',
      sourceUrl:
        schoolTiers.find((tier) => tier.scholarship_page_url)?.scholarship_page_url ??
        schoolTiers.find((tier) => tier.source_url)?.source_url ??
        null
    };
  }

  if (hasScholarshipPage) {
    return {
      sourceType: 'school-page' as const,
      sourceLabel: 'Official scholarship page',
      sourceUrl: schoolTiers.find((tier) => tier.scholarship_page_url)?.scholarship_page_url ?? null
    };
  }

  if (hasSourceUrl) {
    return {
      sourceType: 'published' as const,
      sourceLabel: 'Published scholarship table',
      sourceUrl: schoolTiers.find((tier) => tier.source_url)?.source_url ?? null
    };
  }

  return {
    sourceType: 'mixed' as const,
    sourceLabel: 'Scholarship data on file',
    sourceUrl: null
  };
}

function getMockScholarshipTierRows(): ScholarshipTierRow[] {
  const tierRanks = new Map<string, number>();

  return scholarshipTiers.map((tier) => {
    const nextRank = (tierRanks.get(tier.collegeSlug) ?? 0) + 1;
    tierRanks.set(tier.collegeSlug, nextRank);

    return {
      school_slug: tier.collegeSlug,
      school_name: tier.collegeName,
      short_name: null,
      bucket_default: true,
      bucket_local: false,
      bucket_best_value: true,
      sort_priority_default: null,
      sort_priority_local: null,
      sort_priority_best_value: null,
      tier_name: tier.tierName,
      tier_rank: nextRank,
      min_unweighted_gpa: tier.minGpa,
      max_unweighted_gpa: null,
      min_act: tier.minAct,
      max_act: null,
      annual_award_usd: tier.annualAwardUsd,
      years_assumed: 4,
      projected_total_usd: tier.annualAwardUsd * 4,
      residency_rule_type: 'all_students',
      eligible_states: null,
      regional_rule_note: null,
      requires_full_time: true,
      requires_separate_application: false,
      application_note: null,
      renewable: true,
      renewal_note: null,
      source_url: null,
      source_note: null,
      scholarship_page_url: null,
      school_notes_short: null,
      is_competitive: false,
      tier_last_updated: null,
      school_last_updated: null
    };
  });
}

export function calculateScholarshipProjections({
  gpa,
  act,
  residency,
  filter,
  tiers
}: CalculatorInput) {
  const filtered = tiers.filter(
    (tier) => matchesResidency(tier, residency) && matchesFilter(tier, filter)
  );

  const grouped = filtered.reduce<Record<string, ScholarshipTierRow[]>>((acc, tier) => {
    if (!acc[tier.school_slug]) acc[tier.school_slug] = [];
    acc[tier.school_slug].push(tier);
    return acc;
  }, {});

  const results = Object.values(grouped)
    .map((schoolTiers): ScholarshipProjectionResult | null => {
    const ordered = [...schoolTiers].sort((a, b) => a.tier_rank - b.tier_rank);

    const evaluated = ordered.map((tier) => evaluateTier(tier, gpa, act));

    const qualified = evaluated.filter((tier) => tier.isQualified);
    const hasQualified = qualified.length > 0;
    const reachable = evaluated.filter((tier) => tier.isReachable);

    if (!reachable.length && !qualified.length) {
      return null;
    }

    const primary = hasQualified
      ? [...qualified].sort((a, b) => {
          if (a.projected_total_usd !== b.projected_total_usd) {
            return b.projected_total_usd - a.projected_total_usd;
          }
          return a.tier_rank - b.tier_rank;
        })[0]
      : [...evaluated].sort((a, b) => {
          const aReachable = a.isReachable ? 0 : 1;
          const bReachable = b.isReachable ? 0 : 1;
          if (aReachable !== bReachable) return aReachable - bReachable;
          if (a.improvementScore !== b.improvementScore) return a.improvementScore - b.improvementScore;
          if (a.projected_total_usd !== b.projected_total_usd) {
            return b.projected_total_usd - a.projected_total_usd;
          }
          return a.tier_rank - b.tier_rank;
        })[0];

    const candidateNextTiers = evaluated.filter((tier) => {
      if (!tier.isReachable || tier.isQualified) return false;

      if (hasQualified) {
        return (
          tier.projected_total_usd > primary.projected_total_usd &&
          tier.tier_name !== primary.tier_name
        );
      }

      return (
        tier.projected_total_usd > primary.projected_total_usd ||
        (tier.projected_total_usd === primary.projected_total_usd &&
          tier.tier_name !== primary.tier_name)
      );
    });

    const groupedNextTargets = Object.values(
      candidateNextTiers.reduce<Record<string, typeof candidateNextTiers>>((acc, tier) => {
        const key = `${tier.tier_name}__${tier.projected_total_usd}`;

        if (!acc[key]) acc[key] = [];
        acc[key].push(tier);
        return acc;
      }, {})
    )
      .map((group) => {
        const sortedPaths = [...group].sort(comparePreferredPaths);

        const nonDominatedPaths = sortedPaths
          .filter((tier, index, arr) => {
            return !arr.some((other, otherIndex) => {
              if (index === otherIndex) return false;
              return isDominatedPath(tier, other);
            });
          });

        const representative = [...nonDominatedPaths].sort(comparePreferredPaths)[0] ?? sortedPaths[0];

        return {
          tier_name: representative.tier_name,
          projected_total_usd: representative.projected_total_usd,
          annual_award_usd: representative.annual_award_usd,
          requires_separate_application: representative.requires_separate_application,
          application_note: representative.application_note,
          actGap: representative.actGap,
          gpaGap: representative.gpaGap,
          dimensionsNeeded: representative.dimensionsNeeded,
          requirementDetails: representative.requirementDetails
        };
      })
      .sort((a, b) => a.projected_total_usd - b.projected_total_usd)
      .slice(0, hasQualified ? 3 : 2);

    return {
      schoolSlug: primary.school_slug,
      schoolName: primary.school_name,
      shortName: primary.short_name,
      ...getSourceMeta(ordered),
      primary,
      nextSteps: groupedNextTargets,
      note: getSchoolNote(ordered, act)
    };
    })
    .filter((result): result is ScholarshipProjectionResult => result != null);

  return results.sort((a, b) => {
    const aPriority = getSortPriority(grouped[a.schoolSlug][0], filter);
    const bPriority = getSortPriority(grouped[b.schoolSlug][0], filter);

    if (aPriority != null && bPriority != null && aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    if (aPriority != null && bPriority == null) return -1;
    if (aPriority == null && bPriority != null) return 1;

    if (filter === 'default') {
      const aClosest = getClosestSimpleStep(a);
      const bClosest = getClosestSimpleStep(b);

      if (aClosest.dimensionsNeeded !== bClosest.dimensionsNeeded) {
        return aClosest.dimensionsNeeded - bClosest.dimensionsNeeded;
      }

      if (aClosest.actGap !== bClosest.actGap) {
        return aClosest.actGap - bClosest.actGap;
      }

      if (aClosest.upside !== bClosest.upside) {
        return bClosest.upside - aClosest.upside;
      }

      const aNearby = getNearbyUpsideProfile(a);
      const bNearby = getNearbyUpsideProfile(b);
      if (aNearby.upside !== bNearby.upside) {
        return bNearby.upside - aNearby.upside;
      }
    }

    if (filter === 'all') {
      const aCurrent = getCurrentOfferProfile(a);
      const bCurrent = getCurrentOfferProfile(b);

      if (aCurrent.currentValue !== bCurrent.currentValue) {
        return bCurrent.currentValue - aCurrent.currentValue;
      }

      if (aCurrent.yearlyValue !== bCurrent.yearlyValue) {
        return bCurrent.yearlyValue - aCurrent.yearlyValue;
      }

      if (aCurrent.nearbyUpside !== bCurrent.nearbyUpside) {
        return bCurrent.nearbyUpside - aCurrent.nearbyUpside;
      }

      if (aCurrent.closestGap !== bCurrent.closestGap) {
        return aCurrent.closestGap - bCurrent.closestGap;
      }
    }

    if (filter === 'best') {
      const aNearby = getNearbyUpsideProfile(a);
      const bNearby = getNearbyUpsideProfile(b);

      if (aNearby.upside !== bNearby.upside) {
        return bNearby.upside - aNearby.upside;
      }

      if (aNearby.actOnly !== bNearby.actOnly) {
        return bNearby.actOnly - aNearby.actOnly;
      }

      if (aNearby.actGap !== bNearby.actGap) {
        return aNearby.actGap - bNearby.actGap;
      }

      if (aNearby.dimensionsNeeded !== bNearby.dimensionsNeeded) {
        return aNearby.dimensionsNeeded - bNearby.dimensionsNeeded;
      }

      const aUpside = getUpsideValue(a);
      const bUpside = getUpsideValue(b);
      if (aUpside !== bUpside) {
        return bUpside - aUpside;
      }
    }

    if (filter === 'local') {
      const aClosest = getClosestSimpleStep(a);
      const bClosest = getClosestSimpleStep(b);

      if (aClosest.dimensionsNeeded !== bClosest.dimensionsNeeded) {
        return aClosest.dimensionsNeeded - bClosest.dimensionsNeeded;
      }

      if (aClosest.actGap !== bClosest.actGap) {
        return aClosest.actGap - bClosest.actGap;
      }
    }

    return a.schoolName.localeCompare(b.schoolName);
  });
}

export async function getClassOfferings(): Promise<ClassOffering[]> {
  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return classOfferings.map((offering) => {
      const checkoutConfig = getStripeCheckoutConfig(offering);

      return {
        ...offering,
        priceCents: checkoutConfig.priceCents ?? offering.priceCents,
        stripePriceId: checkoutConfig.priceId
      };
    });
  }

  const { data, error } = await supabase
    .from('class_offerings')
    .select('id, slug, title, schedule, location, format, price_cents, seats_available, featured, stripe_price_id')
    .order('featured', { ascending: false })
    .order('start_date', { ascending: true });

  if (error || !data) {
    return classOfferings;
  }

  return data.map((item) => {
    const offering = {
      id: item.id,
      slug: item.slug,
      title: item.title,
      schedule: item.schedule,
      location: item.location,
      format: item.format,
      priceCents: item.price_cents,
      seatsAvailable: item.seats_available,
      featured: item.featured,
      stripePriceId: item.stripe_price_id
    };
    const checkoutConfig = getStripeCheckoutConfig(offering);

    return {
      ...offering,
      priceCents: checkoutConfig.priceCents ?? offering.priceCents,
      stripePriceId: checkoutConfig.priceId
    };
  });
}

export async function getSchools(): Promise<School[]> {
  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return schools;
  }

  const { data, error } = await supabase
    .from('schools')
    .select('id, slug, name, district, hero_image_url, short_pitch')
    .order('name', { ascending: true });

  if (error || !data) {
    return schools;
  }

  return data.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    district: item.district,
    heroImageUrl: item.hero_image_url,
    shortPitch: item.short_pitch
  }));
}

export async function getSchoolBySlug(slug: string): Promise<School | null> {
  const all = await getSchools();
  return all.find((school) => school.slug === slug) ?? null;
}

export async function getScholarshipTiers() {
  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return getMockScholarshipTierRows();
  }

  const { data, error } = await supabase
    .from('scholarship_tiers_with_school')
    .select(`
      scholarship_tier_id,
      school_id,
      school_slug,
      school_name,
      short_name,
      state_code,
      city,
      bucket_default,
      bucket_local,
      bucket_best_value,
      sort_priority_default,
      sort_priority_local,
      sort_priority_best_value,
      website_url,
      scholarship_page_url,
      school_notes_short,
      school_is_active,
      school_last_updated,
      tier_name,
      tier_rank,
      min_unweighted_gpa,
      max_unweighted_gpa,
      min_act,
      max_act,
      annual_award_usd,
      years_assumed,
      projected_total_usd,
      residency_rule_type,
      eligible_states,
      regional_rule_note,
      requires_full_time,
      requires_separate_application,
      application_note,
      renewable,
      renewal_note,
      is_major_restricted,
      is_competitive,
      tier_is_active,
      source_url,
      source_note,
      tier_last_updated
    `)
    .eq('school_is_active', true)
    .eq('tier_is_active', true)
    .order('sort_priority_default', { ascending: true })
    .order('school_name', { ascending: true })
    .order('tier_rank', { ascending: true });

  if (error || !data) {
    console.error('Error loading scholarship tiers:', error);
    return getMockScholarshipTierRows();
  }

  return data;
}
