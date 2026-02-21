import { getSchools } from '$lib/server/data';

export async function load() {
  return {
    schools: await getSchools()
  };
}
