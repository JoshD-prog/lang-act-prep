import { getClassOfferings } from '$lib/server/data';

export async function load({ url }) {
  return {
    classes: await getClassOfferings(),
    selectedSchool: url.searchParams.get('school') ?? ''
  };
}
