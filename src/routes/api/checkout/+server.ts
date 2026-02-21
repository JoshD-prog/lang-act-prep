import { createCheckoutSession } from '$lib/server/checkout';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const body = await request.json().catch(() => null);

  const classSlug = String(body?.classSlug ?? '').trim();
  const schoolSlug = String(body?.schoolSlug ?? '').trim();
  const email = String(body?.email ?? '').trim();

  if (!classSlug || !email) {
    return json({ error: 'classSlug and email are required.' }, { status: 400 });
  }

  const sessionUrl = await createCheckoutSession({
    classSlug,
    schoolSlug,
    email
  });

  if (!sessionUrl) {
    return json(
      {
        error: 'Stripe is not configured. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID.'
      },
      { status: 500 }
    );
  }

  return json({ checkoutUrl: sessionUrl }, { status: 200 });
}
