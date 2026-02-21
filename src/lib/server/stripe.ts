import { env } from '$env/dynamic/private';
import Stripe from 'stripe';

export function createStripeClient() {
  if (!env.STRIPE_SECRET_KEY) {
    return null;
  }

  return new Stripe(env.STRIPE_SECRET_KEY);
}
