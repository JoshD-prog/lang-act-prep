import { createAdminSupabaseClient } from '$lib/server/supabase';
import { getClassOfferings, getSchools } from '$lib/server/data';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

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

    const supabase = createAdminSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('enrollment_leads').insert({
        student_name: studentName,
        parent_email: parentEmail,
        class_slug: classSlug,
        school_slug: schoolSlug || null,
        notes: notes || null
      });

      if (error) {
        return fail(500, {
          message: 'We could not save your enrollment lead. Please try again.'
        });
      }
    }

    const params = new URLSearchParams({
      class: classSlug,
      email: parentEmail
    });

    if (schoolSlug) {
      params.set('school', schoolSlug);
    }

    redirect(303, `/checkout?${params.toString()}`);
  }
};
