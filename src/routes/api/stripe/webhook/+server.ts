import Stripe from 'stripe';
import type { RequestHandler } from './$types';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { createAdminSupabaseClient } from '$lib/server/supabase';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
});

export const POST: RequestHandler = async ({ request }) => {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing Stripe signature', { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Webhook signature verification failed';
    console.error('Stripe webhook signature verification failed:', message);
    return new Response(message, { status: 400 });
  }

  console.log('Stripe webhook received event:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('Stripe session metadata:', session.metadata);

    const leadId = session.metadata?.lead_id ?? '';
    const classSlug = session.metadata?.class_slug ?? '';

    if (leadId && classSlug) {
      const supabase = createAdminSupabaseClient();

      if (supabase) {
        const { data: lead, error: leadLookupError } = await supabase
          .from('enrollment_leads')
          .select('id, payment_status')
          .eq('id', leadId)
          .single();

        if (!leadLookupError && lead && lead.payment_status !== 'paid') {
          const { error: updateLeadError } = await supabase
            .from('enrollment_leads')
            .update({
              payment_status: 'paid',
              stripe_session_id: session.id,
              stripe_payment_intent_id:
                typeof session.payment_intent === 'string'
                  ? session.payment_intent
                  : null,
              paid_at: new Date().toISOString()
            })
            .eq('id', leadId);

          if (!updateLeadError) {
            const { data: classRows, error: classLookupError } = await supabase
              .from('class_offerings')
              .select('id, seats_available')
              .eq('slug', classSlug)
              .limit(1);

            if (!classLookupError && classRows && classRows.length > 0) {
              const classRow = classRows[0];
              const currentSeats = Number(classRow.seats_available ?? 0);

              if (currentSeats > 0) {
                await supabase
                  .from('class_offerings')
                  .update({
                    seats_available: currentSeats - 1
                  })
                  .eq('id', classRow.id);
              }
            }
          }
        }
      }
    }
  }

  return new Response('ok', { status: 200 });
};