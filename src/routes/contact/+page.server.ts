import { createAdminSupabaseClient } from '$lib/server/supabase';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    const fullName = String(form.get('fullName') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const studentGrade = String(form.get('studentGrade') ?? '').trim();
    const studentSchool = String(form.get('studentSchool') ?? '').trim();
    const interest = String(form.get('interest') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();

    const values = {
      fullName,
      email,
      phone,
      studentGrade,
      studentSchool,
      interest,
      message
    };

    if (!fullName || !email || !message) {
      return fail(400, {
        message: 'Name, email, and message are required.',
        values
      });
    }

    const supabase = createAdminSupabaseClient();
    if (!supabase) {
      return fail(500, {
        message: 'Contact form is not configured yet. Please email hello@actprepclasses.com.',
        values
      });
    }

    const { error } = await supabase.from('contact_inquiries').insert({
      full_name: fullName,
      email,
      phone: phone || null,
      student_grade: studentGrade || null,
      student_school: studentSchool || null,
      interest: interest || null,
      message
    });

    if (error) {
      return fail(500, {
        message: 'We could not save your message. Please try again.',
        values
      });
    }

    return {
      success: true,
      message: 'Thanks. We received your message and will follow up soon.'
    };
  }
};
