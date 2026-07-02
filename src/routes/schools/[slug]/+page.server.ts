import { error } from '@sveltejs/kit';
import { getClassOfferings, getSchoolBySlug } from '$lib/server/data';

export async function load({ params }) {
  const [school, classes] = await Promise.all([getSchoolBySlug(params.slug), getClassOfferings()]);

  if (!school) {
    error(404, 'School not found.');
  }

  return {
    classes,
    school
  };
}
