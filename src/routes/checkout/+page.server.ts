import { createCheckoutSession } from '$lib/server/checkout';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ url }) {
  return {
    classSlug: url.searchParams.get('class') ?? '',
    schoolSlug: url.searchParams.get('school') ?? '',
    email: url.searchParams.get('email') ?? ''
  };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    const classSlug = String(form.get('classSlug') ?? '').trim();
    const schoolSlug = String(form.get('schoolSlug') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();

    if (!classSlug || !email) {
      return fail(400, {
        message: 'Missing class selection or parent email.'
      });
    }

    const sessionUrl = await createCheckoutSession({
      classSlug,
      schoolSlug,
      email
    });

    if (!sessionUrl) {
      return fail(500, {
        message:
          'Stripe is not configured yet. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID, then retry checkout.'
      });
    }

    redirect(303, sessionUrl);
  }
};
