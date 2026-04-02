import { getClassOfferings } from '$lib/server/data';
import { createStripeClient } from '$lib/server/stripe';
import { createAdminSupabaseClient } from '$lib/server/supabase';

export async function load({ url }) {
  const sessionId = url.searchParams.get('session_id')?.trim() ?? '';

  if (!sessionId) {
    return {
      sessionFound: false,
      paymentReceived: false,
      webhookRecorded: false,
      classTitle: '',
      parentEmail: ''
    };
  }

  const stripe = createStripeClient();

  if (!stripe) {
    return {
      sessionFound: false,
      paymentReceived: false,
      webhookRecorded: false,
      classTitle: '',
      parentEmail: '',
      sessionId
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const classSlug = session.metadata?.class_slug ?? '';
    const leadId = session.metadata?.lead_id ?? '';
    const parentEmail = session.customer_details?.email ?? session.customer_email ?? '';

    const offerings = await getClassOfferings();
    const offering = offerings.find((item) => item.slug === classSlug);

    let webhookRecorded = false;

    const supabase = createAdminSupabaseClient();
    if (supabase) {
      const leadQuery = leadId
        ? supabase
            .from('enrollment_leads')
            .select('payment_status, stripe_event_id')
            .eq('id', leadId)
            .limit(1)
        : supabase
            .from('enrollment_leads')
            .select('payment_status, stripe_event_id')
            .eq('stripe_session_id', session.id)
            .limit(1);

      const { data: leadRows, error: leadLookupError } = await leadQuery;

      if (leadLookupError) {
        console.error('Success page lead lookup failed:', leadLookupError);
      } else {
        const lead = leadRows?.[0];
        webhookRecorded = Boolean(lead?.stripe_event_id) || lead?.payment_status === 'paid';
      }
    }

    return {
      sessionFound: true,
      sessionId,
      paymentReceived: session.payment_status === 'paid',
      webhookRecorded,
      classTitle: offering?.title ?? classSlug,
      parentEmail
    };
  } catch (error) {
    console.error('Stripe session retrieval failed:', error);

    return {
      sessionFound: false,
      sessionId,
      paymentReceived: false,
      webhookRecorded: false,
      classTitle: '',
      parentEmail: ''
    };
  }
}
