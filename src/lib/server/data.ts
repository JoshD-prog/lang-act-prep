import { classOfferings, scholarshipTiers, schools } from '$lib/content/mockData';
import type { ClassOffering, CollegeTier, ScholarshipProjection, School } from '$lib/types';
import { createAdminSupabaseClient } from '$lib/server/supabase';

function orderScholarshipTiers(tiers: CollegeTier[]) {
  return [...tiers].sort((a, b) => {
    if (a.minAct === b.minAct) return a.minGpa - b.minGpa;
    return a.minAct - b.minAct;
  });
}

export function calculateScholarshipProjections(gpa: number, act: number, tiers: CollegeTier[]) {
  const collegeMap = new Map<string, CollegeTier[]>();
  for (const tier of tiers) {
    const current = collegeMap.get(tier.collegeSlug) ?? [];
    current.push(tier);
    collegeMap.set(tier.collegeSlug, current);
  }

  const projections: ScholarshipProjection[] = [];
  for (const [, groupedTiers] of collegeMap.entries()) {
    const ordered = orderScholarshipTiers(groupedTiers);
    const qualified = ordered.filter((tier) => gpa >= tier.minGpa && act >= tier.minAct).at(-1);

    const nextTiers = ordered
      .filter((tier) => {
        if (qualified?.tierName === tier.tierName) {
          return false;
        }
        return gpa < tier.minGpa || act < tier.minAct;
      })
      .slice(0, 2);

    projections.push({
      collegeName: ordered[0]?.collegeName ?? 'College',
      qualifiedTier: qualified,
      nextTiers
    });
  }

  return projections.sort((a, b) => a.collegeName.localeCompare(b.collegeName));
}

export async function getClassOfferings(): Promise<ClassOffering[]> {
  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return classOfferings;
  }

  const { data, error } = await supabase
    .from('class_offerings')
    .select('id, slug, title, schedule, format, price_cents, seats_available, featured')
    .order('featured', { ascending: false });

  if (error || !data) {
    return classOfferings;
  }

  return data.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    schedule: item.schedule,
    format: item.format,
    priceCents: item.price_cents,
    seatsAvailable: item.seats_available,
    featured: item.featured
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

export async function getScholarshipTiers(): Promise<CollegeTier[]> {
  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return scholarshipTiers;
  }

  const { data, error } = await supabase
    .from('college_scholarship_tiers')
    .select('college_slug, college_name, tier_name, min_gpa, min_act, annual_award_usd')
    .order('college_name', { ascending: true })
    .order('min_act', { ascending: true })
    .order('min_gpa', { ascending: true });

  if (error || !data) {
    return scholarshipTiers;
  }

  return data.map((item) => ({
    collegeSlug: item.college_slug,
    collegeName: item.college_name,
    tierName: item.tier_name,
    minGpa: Number(item.min_gpa),
    minAct: item.min_act,
    annualAwardUsd: item.annual_award_usd
  }));
}
