// src/routes/enroll/+page.server.ts

import { createAdminSupabaseClient } from '$lib/server/supabase';
import { appendMarketingParams, getMarketingParams } from '$lib/analytics';
import { getClassOfferings } from '$lib/server/data';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ url }) {
  const selectedClass = url.searchParams.get('class') ?? '';
  return {
    classes: await getClassOfferings(),
    selectedClass,
    marketingParams: getMarketingParams(url)
  };
}

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();

    const studentName = String(form.get('studentName') ?? '').trim();
    const parentEmail = String(form.get('parentEmail') ?? '').trim();
    const heardAboutUs = String(form.get('heardAboutUs') ?? '').trim();
    const classSlug = String(form.get('classSlug') ?? '').trim();
    const notes = String(form.get('notes') ?? '').trim();
    const marketingParams = getMarketingParams(form);

    if (!studentName || !parentEmail || !classSlug) {
      return fail(400, {
        message: 'Student name, parent email, and class selection are required.',
        studentName,
        parentEmail,
        heardAboutUs,
        classSlug,
        notes
      });
    }

    let leadId: string | null = null;

    const supabase = createAdminSupabaseClient();
    if (supabase) {
      const { data: insertedLead, error: insertError } = await supabase
        .from('enrollment_leads')
        .insert({
          student_name: studentName,
          parent_email: parentEmail,
          heard_about_us: heardAboutUs || null,
          class_slug: classSlug,
          notes: notes || null
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('Enrollment lead insert failed:', insertError);

        return fail(500, {
          message: 'We could not save your enrollment lead. Please try again.',
          studentName,
          parentEmail,
          heardAboutUs,
          classSlug,
          notes
        });
      }

      leadId = insertedLead?.id ?? null;
    }

    const params = new URLSearchParams({
      class: classSlug,
      email: parentEmail
    });

    if (leadId) {
      params.set('lead', leadId);
    }

    if (heardAboutUs) {
      cookies.set('enrollment_heard_about_us', heardAboutUs, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60
      });
    } else {
      cookies.delete('enrollment_heard_about_us', {
        path: '/'
      });
    }

    throw redirect(303, appendMarketingParams(`/checkout?${params.toString()}`, marketingParams));
  }
};
