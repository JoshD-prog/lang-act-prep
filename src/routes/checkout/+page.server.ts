import { createCheckoutSession } from '$lib/server/checkout';
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import { getClassOfferings } from '$lib/server/data';
import type { Actions } from './$types';

export async function load({ url }) {
  const classSlug = url.searchParams.get('class') ?? '';
  const email = url.searchParams.get('email') ?? '';
  const leadId = url.searchParams.get('lead') ?? '';

  const offerings = await getClassOfferings();
  const offering = offerings.find((c) => c.slug === classSlug);
  const stripeReady = Boolean(env.STRIPE_SECRET_KEY && offering?.stripePriceId);

  return {
    classSlug,
    classTitle: offering?.title ?? classSlug,
    classSchedule: offering?.schedule ?? '',
    classLocation: offering?.location ?? '',
    classFormat: offering?.format ?? '',
    email,
    leadId,
    stripeReady
  };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    const classSlug = String(form.get('classSlug') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const leadId = String(form.get('leadId') ?? '').trim();

    if (!classSlug || !email) {
      return fail(400, {
        message: 'Missing class selection or parent email.'
      });
    }

    const sessionUrl = await createCheckoutSession({
      classSlug,
      email,
      leadId
        });

    if (!sessionUrl) {
      return fail(500, {
        message:
          'Stripe is not configured yet. Add STRIPE_SECRET_KEY and a class-specific stripe_price_id.'
      });
    }

    throw redirect(303, sessionUrl);
  }
};
