import { getScholarshipTiers } from '$lib/server/data';

type ScholarshipTierLike = Awaited<ReturnType<typeof getScholarshipTiers>>[number];

type HomepageScholarshipExample = {
  schoolName: string;
  detailLabel: string;
  fromAct: number;
  toAct: number;
  fromAwardUsd: number;
  toAwardUsd: number;
  deltaAnnualUsd: number;
  deltaTotalUsd: number;
  sourceUrl: string;
};

function normalizeEligibleStates(value: ScholarshipTierLike['eligible_states']) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim().toUpperCase()).filter(Boolean);
  }

  return String(value)
    .replace(/[{}]/g, '')
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
}

function getAudienceLabel(tier: ScholarshipTierLike) {
  if (tier.residency_rule_type === 'all_students') return 'All students';
  if (tier.residency_rule_type === 'out_of_state') return 'Out-of-state students';

  const states = normalizeEligibleStates(tier.eligible_states);
  if (!states.length) return 'Eligible students';
  if (states.length === 1 && states[0] === 'KS') return 'Kansas students';
  if (states.length === 1 && states[0] === 'MO') return 'Missouri students';
  if (states.length === 2 && states.includes('KS') && states.includes('MO')) {
    return 'Kansas and Missouri students';
  }

  return `${states.join(' / ')} students`;
}

function getPublishedScholarshipExamples(tiers: ScholarshipTierLike[]): HomepageScholarshipExample[] {
  const publishedTiers = tiers.filter((tier) => {
    return (
      tier.school_name !== 'Missouri University of Science and Technology' &&
      Boolean(tier.source_url || tier.scholarship_page_url) &&
      tier.min_unweighted_gpa != null &&
      tier.min_act != null
    );
  });

  const grouped = publishedTiers.reduce<Map<string, ScholarshipTierLike[]>>((acc, tier) => {
    const key = [
      tier.school_name,
      tier.residency_rule_type,
      JSON.stringify(normalizeEligibleStates(tier.eligible_states)),
      tier.min_unweighted_gpa
    ].join('|');

    if (!acc.has(key)) acc.set(key, []);
    acc.get(key)?.push(tier);
    return acc;
  }, new Map());

  const candidateExamples = Array.from(grouped.values()).flatMap((group) => {
    const ordered = [...group].sort((a, b) => {
      const actDiff = (a.min_act ?? 0) - (b.min_act ?? 0);
      if (actDiff !== 0) return actDiff;
      return a.annual_award_usd - b.annual_award_usd;
    });

    return ordered.slice(1).flatMap((tier, index) => {
      const previous = ordered[index];

      if (!previous || tier.annual_award_usd <= previous.annual_award_usd) {
        return [];
      }

      return [
        {
          schoolName: tier.school_name,
          detailLabel: `${getAudienceLabel(tier)} - ${(tier.min_unweighted_gpa ?? 0).toFixed(2)} GPA`,
          fromAct: previous.min_act ?? 0,
          toAct: tier.min_act ?? 0,
          fromAwardUsd: previous.annual_award_usd,
          toAwardUsd: tier.annual_award_usd,
          deltaAnnualUsd: tier.annual_award_usd - previous.annual_award_usd,
          deltaTotalUsd: tier.projected_total_usd - previous.projected_total_usd,
          sourceUrl: tier.scholarship_page_url ?? tier.source_url ?? ''
        } satisfies HomepageScholarshipExample
      ];
    });
  });

  const bestBySchool = Array.from(
    candidateExamples.reduce<Map<string, HomepageScholarshipExample>>((acc, example) => {
      const existing = acc.get(example.schoolName);

      if (
        !existing ||
        example.deltaTotalUsd > existing.deltaTotalUsd ||
        (example.deltaTotalUsd === existing.deltaTotalUsd && example.toAct - example.fromAct < existing.toAct - existing.fromAct)
      ) {
        acc.set(example.schoolName, example);
      }

      return acc;
    }, new Map()).values()
  );

  return bestBySchool
    .sort((a, b) => {
      if (a.deltaTotalUsd !== b.deltaTotalUsd) return b.deltaTotalUsd - a.deltaTotalUsd;
      const aActGap = a.toAct - a.fromAct;
      const bActGap = b.toAct - b.fromAct;
      if (aActGap !== bActGap) return aActGap - bActGap;
      return a.schoolName.localeCompare(b.schoolName);
    })
    .slice(0, 3);
}

function getBestExampleInActRange(
  tiers: ScholarshipTierLike[],
  minGap: number,
  maxGap: number
): HomepageScholarshipExample | null {
  const publishedTiers = tiers.filter((tier) => {
    return (
      tier.school_name !== 'Missouri University of Science and Technology' &&
      Boolean(tier.source_url || tier.scholarship_page_url) &&
      tier.min_unweighted_gpa != null &&
      tier.min_act != null
    );
  });

  const grouped = publishedTiers.reduce<Map<string, ScholarshipTierLike[]>>((acc, tier) => {
    const key = [
      tier.school_name,
      tier.residency_rule_type,
      JSON.stringify(normalizeEligibleStates(tier.eligible_states)),
      tier.min_unweighted_gpa
    ].join('|');

    if (!acc.has(key)) acc.set(key, []);
    acc.get(key)?.push(tier);
    return acc;
  }, new Map());

  const examples = Array.from(grouped.values()).flatMap((group) => {
    const ordered = [...group].sort((a, b) => {
      const actDiff = (a.min_act ?? 0) - (b.min_act ?? 0);
      if (actDiff !== 0) return actDiff;
      return a.annual_award_usd - b.annual_award_usd;
    });

    return ordered.slice(1).flatMap((tier, index) => {
      const previous = ordered[index];
      const actGap = (tier.min_act ?? 0) - (previous?.min_act ?? 0);

      if (!previous || tier.annual_award_usd <= previous.annual_award_usd) return [];
      if (actGap < minGap || actGap > maxGap) return [];

      return [
        {
          schoolName: tier.school_name,
          detailLabel: `${getAudienceLabel(tier)} - ${(tier.min_unweighted_gpa ?? 0).toFixed(2)} GPA`,
          fromAct: previous.min_act ?? 0,
          toAct: tier.min_act ?? 0,
          fromAwardUsd: previous.annual_award_usd,
          toAwardUsd: tier.annual_award_usd,
          deltaAnnualUsd: tier.annual_award_usd - previous.annual_award_usd,
          deltaTotalUsd: tier.projected_total_usd - previous.projected_total_usd,
          sourceUrl: tier.scholarship_page_url ?? tier.source_url ?? ''
        } satisfies HomepageScholarshipExample
      ];
    });
  });

  return (
    examples.sort((a, b) => {
      if (a.deltaTotalUsd !== b.deltaTotalUsd) return b.deltaTotalUsd - a.deltaTotalUsd;
      const aGap = a.toAct - a.fromAct;
      const bGap = b.toAct - b.fromAct;
      if (aGap !== bGap) return aGap - bGap;
      return a.schoolName.localeCompare(b.schoolName);
    })[0] ?? null
  );
}

function getMarkTwainExample(tiers: ScholarshipTierLike[]): HomepageScholarshipExample | null {
  const level2 = tiers.find((tier) => {
    return (
      tier.school_name === 'University of Missouri' &&
      tier.tier_name === 'Mark Twain Level 2' &&
      tier.residency_rule_type === 'out_of_state'
    );
  });

  const level1 = tiers.find((tier) => {
    return (
      tier.school_name === 'University of Missouri' &&
      tier.tier_name === 'Mark Twain Level 1' &&
      tier.residency_rule_type === 'out_of_state'
    );
  });

  if (!level1 || !level2) return null;

  return {
    schoolName: level1.school_name,
    detailLabel: 'Mark Twain tiers for out-of-state students',
    fromAct: level2.min_act ?? 0,
    toAct: level1.min_act ?? 0,
    fromAwardUsd: level2.annual_award_usd,
    toAwardUsd: level1.annual_award_usd,
    deltaAnnualUsd: level1.annual_award_usd - level2.annual_award_usd,
    deltaTotalUsd: level1.projected_total_usd - level2.projected_total_usd,
    sourceUrl: level1.scholarship_page_url ?? level1.source_url ?? ''
  };
}

function getMizzouTierJumpExample(tiers: ScholarshipTierLike[]): HomepageScholarshipExample | null {
  const provost = tiers.find((tier) => {
    return (
      tier.school_name === 'University of Missouri' &&
      tier.tier_name === 'Provost Award' &&
      tier.residency_rule_type === 'specific_states'
    );
  });

  const curators = tiers.find((tier) => {
    return (
      tier.school_name === 'University of Missouri' &&
      tier.tier_name === 'Curators Scholars Award' &&
      tier.residency_rule_type === 'specific_states'
    );
  });

  if (!provost || !curators) return null;

  return {
    schoolName: curators.school_name,
    detailLabel: 'Missouri students',
    fromAct: provost.min_act ?? 0,
    toAct: curators.min_act ?? 0,
    fromAwardUsd: provost.annual_award_usd,
    toAwardUsd: curators.annual_award_usd,
    deltaAnnualUsd: curators.annual_award_usd - provost.annual_award_usd,
    deltaTotalUsd: curators.projected_total_usd - provost.projected_total_usd,
    sourceUrl: curators.scholarship_page_url ?? curators.source_url ?? ''
  };
}

export async function load() {
  const tiers = await getScholarshipTiers();
  const scholarshipExamples = getPublishedScholarshipExamples(tiers);
  const markTwainExample = getMarkTwainExample(tiers);
  const shortJumpExample = getBestExampleInActRange(tiers, 1, 3);
  const midJumpExample = getMizzouTierJumpExample(tiers) ?? getBestExampleInActRange(tiers, 4, 6);

  const orderedExamples = [
    shortJumpExample,
    midJumpExample,
    markTwainExample
  ].filter((example): example is HomepageScholarshipExample => example != null);

  return {
    scholarshipExamples: orderedExamples.length ? orderedExamples : scholarshipExamples
  };
}
