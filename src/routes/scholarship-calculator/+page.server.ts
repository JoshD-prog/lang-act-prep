import { calculateScholarshipProjections, getScholarshipTiers } from '$lib/server/data';

export async function load({ url }) {
  const gpa = Number(url.searchParams.get('gpa') ?? 0);
  const act = Number(url.searchParams.get('act') ?? 0);

  const tiers = await getScholarshipTiers();
  const projections = gpa > 0 && act > 0 ? calculateScholarshipProjections(gpa, act, tiers) : [];

  return {
    gpa,
    act,
    projections
  };
}
