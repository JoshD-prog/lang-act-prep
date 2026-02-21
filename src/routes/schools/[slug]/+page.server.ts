import { error } from '@sveltejs/kit';
import { getSchoolBySlug } from '$lib/server/data';

export async function load({ params }) {
  const school = await getSchoolBySlug(params.slug);
  if (!school) {
    error(404, 'School not found.');
  }

  return {
    school
  };
}
