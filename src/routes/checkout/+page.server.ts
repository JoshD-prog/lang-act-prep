import { appendMarketingParams, getMarketingParams } from '$lib/analytics';
import { createCheckoutSession } from '$lib/server/checkout';
import { createAdminSupabaseClient } from '$lib/server/supabase';
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import { getClassOfferings } from '$lib/server/data';
import { getStripeCheckoutConfig } from '$lib/server/stripe';
import type { Actions } from './$types';

function isMissingHighSchoolColumn(error: unknown) {
  return /high_school_slug/i.test(JSON.stringify(error));
}

export async function load({ url, cookies }) {
  const classSlug = url.searchParams.get('class') ?? '';
  const email = url.searchParams.get('email') ?? '';
  const leadId = url.searchParams.get('lead') ?? '';
  const highSchoolSlug = url.searchParams.get('school') ?? '';
  const heardAboutUs = cookies.get('enrollment_heard_about_us') ?? '';

  const offerings = await getClassOfferings();
  const offering = offerings.find((c) => c.slug === classSlug);
  const checkoutConfig = getStripeCheckoutConfig(offering);
  const stripeReady = Boolean(env.STRIPE_SECRET_KEY && checkoutConfig.priceId);

  return {
    classSlug,
    classTitle: offering?.title ?? classSlug,
    classSchedule: offering?.schedule ?? '',
    classLocation: offering?.location ?? '',
    classFormat: offering?.format ?? '',
    email,
    leadId,
    highSchoolSlug,
    heardAboutUs,
    stripeReady,
    marketingParams: getMarketingParams(url)
  };
}

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();

    const classSlug = String(form.get('classSlug') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const leadId = String(form.get('leadId') ?? '').trim();
    const highSchoolSlug = String(form.get('highSchoolSlug') ?? form.get('schoolSlug') ?? '').trim();
    const heardAboutUs = String(
      form.get('heardAboutUs') ?? cookies.get('enrollment_heard_about_us') ?? ''
    ).trim();
    const marketingParams = getMarketingParams(form);

    if (!classSlug || !email) {
      return fail(400, {
        message: 'Missing class selection or parent email.'
      });
    }

    if (leadId && (heardAboutUs || highSchoolSlug)) {
      const supabase = createAdminSupabaseClient();

      if (supabase) {
        const leadUpdates = {
          ...(heardAboutUs
            ? {
                heard_about_us: heardAboutUs
              }
            : {}),
          ...(highSchoolSlug
            ? {
                high_school_slug: highSchoolSlug
              }
            : {})
        };

        const { error: updateError } = await supabase
          .from('enrollment_leads')
          .update(leadUpdates)
          .eq('id', leadId);

        if (updateError && isMissingHighSchoolColumn(updateError)) {
          const fallbackUpdates = {
            ...(heardAboutUs
              ? {
                  heard_about_us: heardAboutUs
                }
              : {}),
            ...(highSchoolSlug
              ? {
                  school_slug: highSchoolSlug
                }
              : {})
          };

          const { error: fallbackUpdateError } = await supabase
            .from('enrollment_leads')
            .update(fallbackUpdates)
            .eq('id', leadId);

          if (fallbackUpdateError) {
            console.error('Enrollment lead checkout update failed:', fallbackUpdateError);
          }
        } else if (updateError) {
          console.error('Enrollment lead checkout update failed:', updateError);
        }
      }
    }

    const sessionUrl = await createCheckoutSession({
      classSlug,
      email,
      leadId,
      highSchoolSlug,
      heardAboutUs,
      marketingParams
    });

    if (!sessionUrl) {
      return fail(500, {
        message: 'Online payment is temporarily unavailable. Please contact me for help completing your enrollment.'
      });
    }

    cookies.delete('enrollment_heard_about_us', {
      path: '/'
    });

    throw redirect(303, appendMarketingParams(sessionUrl, marketingParams));
  }
};
