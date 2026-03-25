import { classOfferings, scholarshipTiers, schools } from '$lib/content/mockData';
import type { ClassOffering, School } from '$lib/types';
import { createAdminSupabaseClient } from '$lib/server/supabase';

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

function matchesResidency(tier: ScholarshipTierRow, residency: string) {
  if (tier.residency_rule_type === 'all_students') return true;

  if (tier.residency_rule_type === 'specific_states') {
    return tier.eligible_states?.includes(residency) ?? false;
  }

  if (tier.residency_rule_type === 'in_state') {
    return tier.eligible_states?.includes(residency) ?? false;
  }

  if (tier.residency_rule_type === 'out_of_state') {
    return !(tier.eligible_states?.includes(residency) ?? false);
  }

  if (tier.residency_rule_type === 'regional') {
    return tier.eligible_states?.includes(residency) ?? false;
  }

  if (tier.residency_rule_type === 'metro_exception') {
    return tier.eligible_states?.includes(residency) ?? false;
  }

  return true;
}

function matchesFilter(tier: ScholarshipTierRow, filter: string) {
  if (filter === 'local') return tier.bucket_local;
  if (filter === 'best') return tier.bucket_best_value;
  if (filter === 'default') return tier.bucket_default;
  return true;
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

  const results = Object.values(grouped).map((schoolTiers) => {
    const ordered = [...schoolTiers].sort((a, b) => a.tier_rank - b.tier_rank);

    const evaluated = ordered.map((tier) => {
      const meetsGPA =
        tier.min_unweighted_gpa == null || gpa >= tier.min_unweighted_gpa;

      const meetsACT =
        tier.min_act == null || act >= tier.min_act;

      const gpaGap =
        tier.min_unweighted_gpa == null
          ? 0
          : Math.max(0, Number((tier.min_unweighted_gpa - gpa).toFixed(2)));

      const actGap =
        tier.min_act == null
          ? 0
          : Math.max(0, tier.min_act - act);

      let status: 'qualified' | 'act_needed' | 'gpa_needed' | 'gpa_and_act_needed';

      if (meetsGPA && meetsACT) status = 'qualified';
      else if (meetsGPA && !meetsACT) status = 'act_needed';
      else if (!meetsGPA && meetsACT) status = 'gpa_needed';
      else status = 'gpa_and_act_needed';

      return {
        ...tier,
        meetsGPA,
        meetsACT,
        gpaGap,
        actGap,
        status
      };
    });

    const qualified = evaluated.filter((tier) => tier.status === 'qualified');
    const hasQualified = qualified.length > 0;

    const primary = hasQualified
      ? qualified[qualified.length - 1]
      : [...evaluated].sort((a, b) => {
          const aDistance = a.actGap + a.gpaGap * 10;
          const bDistance = b.actGap + b.gpaGap * 10;
          if (aDistance !== bDistance) return aDistance - bDistance;
          return a.tier_rank - b.tier_rank;
        })[0];

    const nextSteps = evaluated
      .filter((tier) => tier.tier_rank > primary.tier_rank)
      .slice(0, hasQualified ? 3 : 2);

    const highestTier = ordered[ordered.length - 1];
    const actExceedsHighest =
      highestTier?.min_act != null ? act > highestTier.min_act : false;

    return {
      schoolSlug: primary.school_slug,
      schoolName: primary.school_name,
      shortName: primary.short_name,
      primary,
      nextSteps,
      actExceedsHighest,
      note: actExceedsHighest
        ? 'Students with very competitive ACT scores may also want to explore additional competitive scholarships, including full-tuition or full-ride opportunities not modeled here.'
        : null
    };
  });

  return results.sort((a, b) => a.schoolName.localeCompare(b.schoolName));
}

export async function getClassOfferings(): Promise<ClassOffering[]> {
  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return classOfferings;
  }

  const { data, error } = await supabase
    .from('class_offerings')
    .select('id, slug, title, schedule, location, format, price_cents, seats_available, featured, stripe_price_id')
    .order('featured', { ascending: false })
    .order('start_date', { ascending: true });

  if (error || !data) {
    return classOfferings;
  }

    return data.map((item) => ({
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
}));
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
    return [];
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
    return [];
  }

  return data;
}
