import { env } from '$env/dynamic/private';
import { createStripeClient } from '$lib/server/stripe';

interface CheckoutInput {
  classSlug: string;
  schoolSlug?: string;
  email: string;
}

export async function createCheckoutSession({ classSlug, schoolSlug, email }: CheckoutInput) {
  const stripe = createStripeClient();
  if (!stripe || !env.STRIPE_PRICE_ID) {
    return null;
  }

  const baseUrl = env.PUBLIC_SITE_URL || env.SITE_URL || 'http://localhost:5173';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
    metadata: {
      class_slug: classSlug,
      school_slug: schoolSlug ?? 'general'
    },
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel`
  });

  return session.url ?? null;
}
