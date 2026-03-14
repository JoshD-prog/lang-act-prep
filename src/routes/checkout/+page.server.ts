import { createCheckoutSession } from '$lib/server/checkout';
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ url }) {
  const stripeReady = Boolean(env.STRIPE_SECRET_KEY);

  return {
    classSlug: url.searchParams.get('class') ?? '',
    schoolSlug: url.searchParams.get('school') ?? '',
    email: url.searchParams.get('email') ?? '',
    leadId: url.searchParams.get('lead') ?? '',
    stripeReady
  };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    const classSlug = String(form.get('classSlug') ?? '').trim();
    const schoolSlug = String(form.get('schoolSlug') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const leadId = String(form.get('leadId') ?? '').trim();

    if (!classSlug || !email) {
      return fail(400, {
        message: 'Missing class selection or parent email.'
      });
    }

    const sessionUrl = await createCheckoutSession({
      classSlug,
      schoolSlug,
      email,
      leadId
    });

    if (!sessionUrl) {
      return fail(500, {
        message:
          'Stripe is not configured yet, or this class is missing a Stripe price id.'
      });
    }

    throw redirect(303, sessionUrl);
  }
};
