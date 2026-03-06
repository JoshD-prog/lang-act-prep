// src/routes/enroll/+page.server.ts

import { createAdminSupabaseClient } from '$lib/server/supabase';
import { getClassOfferings, getSchools } from '$lib/server/data';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, PUBLIC_SITE_URL } from '$env/static/private';

// Stripe client (server-side only)
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

export async function load({ url }) {
  const selectedClass = url.searchParams.get('class') ?? '';
  const selectedSchool = url.searchParams.get('school') ?? '';

  return {
    classes: await getClassOfferings(),
    schools: await getSchools(),
    selectedClass,
    selectedSchool
  };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    const studentName = String(form.get('studentName') ?? '').trim();
    const parentEmail = String(form.get('parentEmail') ?? '').trim();
    const classSlug = String(form.get('classSlug') ?? '').trim();
    const schoolSlug = String(form.get('schoolSlug') ?? '').trim();
    const notes = String(form.get('notes') ?? '').trim();

    if (!studentName || !parentEmail || !classSlug) {
      return fail(400, {
        message: 'Student name, parent email, and class selection are required.'
      });
    }

    // Save enrollment lead (non-blocking if Supabase client isn't configured)
    const supabase = createAdminSupabaseClient();
    if (supabase) {
      const { error: insertError } = await supabase.from('enrollment_leads').insert({
        student_name: studentName,
        parent_email: parentEmail,
        class_slug: classSlug,
        school_slug: schoolSlug || null,
        notes: notes || null
      });

      if (insertError) {
        return fail(500, {
          message: 'We could not save your enrollment lead. Please try again.'
        });
      }
    }

    // Look up the selected class so we can get its Stripe price id
    const offerings = await getClassOfferings();
    const offering = offerings.find((c) => c.slug === classSlug);

    if (!offering) {
      return fail(404, { message: 'Selected class not found.' });
    }

    // Option 2: per-class Stripe price id from Supabase (recommended)
    const priceId = offering.stripePriceId;

    if (!priceId) {
      return fail(500, { message: 'Missing Stripe price id for this class.' });
    }

    // Ensure this is set in .env
    // Example local: PUBLIC_SITE_URL=http://localhost:5173
    const siteUrl = PUBLIC_SITE_URL || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: parentEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        class_slug: classSlug,
        school_slug: schoolSlug || '',
        student_name: studentName
      },
      success_url: `${siteUrl}/enroll/success?class=${encodeURIComponent(classSlug)}`,
      cancel_url: `${siteUrl}/enroll?class=${encodeURIComponent(classSlug)}${
        schoolSlug ? `&school=${encodeURIComponent(schoolSlug)}` : ''
      }`
    });

    if (!session.url) {
      return fail(500, { message: 'Could not start Stripe checkout. Please try again.' });
    }

    throw redirect(303, session.url);
  }
};
