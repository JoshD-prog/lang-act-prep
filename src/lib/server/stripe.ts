import { env } from '$env/dynamic/private';
import Stripe from 'stripe';
import type { ClassOffering } from '$lib/types';

const STRIPE_API_VERSION: Stripe.LatestApiVersion = '2025-08-27.basil';

export function createStripeClient() {
  if (!env.STRIPE_SECRET_KEY) {
    return null;
  }

  return new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION
  });
}

function getOverridePriceCents() {
  const rawValue = env.STRIPE_PRICE_OVERRIDE_CENTS?.trim();

  if (!rawValue) {
    return null;
  }

  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function getStripeCheckoutConfig(
  offering?: Pick<ClassOffering, 'slug' | 'stripePriceId' | 'priceCents'> | null
) {
  const overridePriceId = env.STRIPE_PRICE_ID?.trim();
  const overrideSlug = env.STRIPE_PRICE_OVERRIDE_CLASS_SLUG?.trim();
  const overrideEnabled =
    Boolean(overridePriceId) && (!overrideSlug || overrideSlug === offering?.slug);

  return {
    priceId: overrideEnabled ? overridePriceId ?? null : offering?.stripePriceId ?? null,
    priceCents: overrideEnabled
      ? getOverridePriceCents() ?? offering?.priceCents ?? null
      : offering?.priceCents ?? null,
    isOverride: overrideEnabled
  };
}
