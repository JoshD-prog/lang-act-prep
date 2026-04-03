import { calculateScholarshipProjections, getScholarshipTiers } from '$lib/server/data';

export async function load({ url }) {
  const hasSearched = url.searchParams.has('gpa') || url.searchParams.has('act');
  const gpa = Number(url.searchParams.get('gpa') ?? 0);
  const act = Number(url.searchParams.get('act') ?? 0);
  const residency = url.searchParams.get('residency') ?? 'KS';
  const filter = url.searchParams.get('filter') ?? 'best';

  const tiers = await getScholarshipTiers();

  const projections =
    gpa > 0 && act > 0
      ? calculateScholarshipProjections({
          gpa,
          act,
          residency,
          filter,
          tiers
        })
      : [];

  return {
    gpa,
    act,
    residency,
    filter,
    hasSearched,
    projections
  };
}
