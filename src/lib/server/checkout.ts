import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import { createStripeClient, getStripeCheckoutConfig } from '$lib/server/stripe';
import { getClassOfferings } from '$lib/server/data';

interface CheckoutInput {
  classSlug: string;
  email: string;
  leadId?: string;
}

export async function createCheckoutSession({
  classSlug,
  email,
  leadId
}: CheckoutInput) {
  const stripe = createStripeClient();
  if (!stripe) {
    return null;
  }

  const offerings = await getClassOfferings();
  const offering = offerings.find((c) => c.slug === classSlug);
  const checkoutConfig = getStripeCheckoutConfig(offering);

  if (!checkoutConfig.priceId) {
    return null;
  }

  const baseUrl = publicEnv.PUBLIC_SITE_URL || privateEnv.SITE_URL || 'http://localhost:5173';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: [{ price: checkoutConfig.priceId, quantity: 1 }],
    allow_promotion_codes: true,
    metadata: {
      class_slug: classSlug,
      lead_id: leadId ?? ''
    },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel`
  });

  return session.url ?? null;
}
