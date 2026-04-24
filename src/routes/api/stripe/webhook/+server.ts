import Stripe from 'stripe';
import type { RequestHandler } from './$types';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { createAdminSupabaseClient } from '$lib/server/supabase';
import {
  sendAdminEnrollmentNotification,
  sendParentConfirmationEmail
} from '$lib/server/email';
import { getClassOfferings } from '$lib/server/data';
import { createStripeClient } from '$lib/server/stripe';

const stripe = createStripeClient();

export const POST: RequestHandler = async ({ request }) => {
  if (!stripe) {
    return new Response('Stripe is not configured', { status: 503 });
  }

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
          .select('id, payment_status, stripe_event_id')
          .eq('id', leadId)
          .single();

        if (leadLookupError) {
          console.error('Lead lookup failed:', leadLookupError);
        } else if (lead) {
          const wasPaid = lead.payment_status === 'paid';

          const { error: updateLeadError } = await supabase
            .from('enrollment_leads')
            .update({
              payment_status: 'paid',
              stripe_event_id: event.id,
              stripe_session_id: session.id,
              stripe_payment_intent_id:
                typeof session.payment_intent === 'string'
                  ? session.payment_intent
                  : null,
              paid_at: new Date().toISOString()
            })
            .eq('id', leadId);

          if (updateLeadError) {
            console.error('Lead update failed:', updateLeadError);
          } else if (!wasPaid) {
            const { data: classRows, error: classLookupError } = await supabase
              .from('class_offerings')
              .select('id, seats_available')
              .eq('slug', classSlug)
              .limit(1);

            if (classLookupError) {
              console.error('Class lookup failed:', classLookupError);
            } else if (!classRows || classRows.length === 0) {
              console.error('No class_offerings row found for slug:', classSlug);
            } else {
              const classRow = classRows[0];
              const currentSeats = Number(classRow.seats_available ?? 0);

              if (currentSeats > 0) {
                const { error: seatUpdateError } = await supabase
                  .from('class_offerings')
                  .update({
                    seats_available: currentSeats - 1
                  })
                  .eq('id', classRow.id);

                if (seatUpdateError) {
                  console.error('Seat decrement failed:', seatUpdateError);
                }
              } else {
                console.warn(
                  'Seat decrement skipped because seats_available was already 0 for:',
                  classSlug
                );
              }
            }

            const { data: fullLead, error: fullLeadError } = await supabase
              .from('enrollment_leads')
              .select('student_name, parent_email, heard_about_us')
              .eq('id', leadId)
              .single();

            if (fullLeadError) {
              console.error('Lead detail lookup failed:', fullLeadError);
            }

            const offerings = await getClassOfferings();
            const offering = offerings.find((c) => c.slug === classSlug);

            const studentName = fullLead?.student_name ?? 'Student';
            const parentEmail = fullLead?.parent_email ?? '';
            const heardAboutUs = fullLead?.heard_about_us ?? null;
            const classTitle = offering?.title ?? classSlug;
            const classSchedule = offering?.schedule ?? '';
            const classLocation = offering?.location ?? '';

            if (parentEmail) {
              try {
                await sendParentConfirmationEmail({
                  parentEmail,
                  studentName,
                  classTitle,
                  classSchedule,
                  classLocation
                });
              } catch (err) {
                console.error('Parent confirmation email failed:', err);
              }

              try {
                await sendAdminEnrollmentNotification({
                  studentName,
                  parentEmail,
                  heardAboutUs,
                  classTitle,
                  classSchedule,
                  leadId
                });
              } catch (err) {
                console.error('Admin notification email failed:', err);
              }
            }
          }
        }
      }
    }
  }

  return new Response('ok', { status: 200 });
};
