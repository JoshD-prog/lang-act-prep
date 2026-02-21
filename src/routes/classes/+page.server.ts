import { getClassOfferings } from '$lib/server/data';

export async function load() {
  return {
    classes: await getClassOfferings()
  };
}
