import { calculateScholarshipProjections, getScholarshipTiers } from '$lib/server/data';
import { sendAdminContactInquiryNotification } from '$lib/server/email';
import { createAdminSupabaseClient } from '$lib/server/supabase';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const FILTERS = new Set(['default', 'all', 'best', 'local']);
const RESIDENCIES = new Set(['KS', 'MO', 'OTHER', 'NE', 'AR', 'OK']);

function parseBoundedNumberParam(value: string | null, min: number, max: number) {
  if (value == null || value.trim() === '') return 0;

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;

  return Math.min(max, Math.max(min, parsed));
}

function parseResidencyParam(value: string | null) {
  const normalized = value?.trim().toUpperCase() ?? 'KS';
  return RESIDENCIES.has(normalized) ? normalized : 'OTHER';
}

function parseFilterParam(value: string | null) {
  const normalized = value?.trim().toLowerCase() ?? 'best';
  return FILTERS.has(normalized) ? normalized : 'best';
}

export async function load({ url }) {
  const gpa = parseBoundedNumberParam(url.searchParams.get('gpa'), 0, 4);
  const act = parseBoundedNumberParam(url.searchParams.get('act'), 1, 36);
  const residency = parseResidencyParam(url.searchParams.get('residency'));
  const filter = parseFilterParam(url.searchParams.get('filter'));
  const hasSearched = gpa > 0 && act > 0;

  const tiers = await getScholarshipTiers();

  const projections =
    gpa > 0 && act > 0
      ? calculateScholarshipProjections({
          gpa,
          act,
          residency,
          filter,
          tiers
        })
      : [];

  return {
    gpa,
    act,
    residency,
    filter,
    hasSearched,
    projections
  };
}

export const actions: Actions = {
  sendResults: async ({ request }) => {
    const form = await request.formData();

    const fullName = String(form.get('fullName') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const studentGrade = String(form.get('studentGrade') ?? '').trim();
    const note = String(form.get('note') ?? '').trim();
    const gpa = String(form.get('gpa') ?? '').trim();
    const act = String(form.get('act') ?? '').trim();
    const residency = String(form.get('residency') ?? '').trim();
    const filter = String(form.get('filter') ?? '').trim();
    const topOpportunitySchool = String(form.get('topOpportunitySchool') ?? '').trim();
    const topOpportunityActGap = String(form.get('topOpportunityActGap') ?? '').trim();
    const topOpportunityValue = String(form.get('topOpportunityValue') ?? '').trim();

    const values = {
      fullName,
      email,
      phone,
      studentGrade,
      note
    };

    if (!fullName || !email) {
      return fail(400, {
        message: 'Name and email are required to send the scholarship snapshot.',
        values
      });
    }

    const parsedTopOpportunityValue = Number(topOpportunityValue);
    const formattedValue = Number.isFinite(parsedTopOpportunityValue)
      ? `$${parsedTopOpportunityValue.toLocaleString()}`
      : 'not available';
    const message = [
      'Scholarship calculator follow-up request.',
      '',
      `Inputs: GPA ${gpa || 'not provided'}, ACT ${act || 'not provided'}, residency ${residency || 'not provided'}, filter ${filter || 'not provided'}.`,
      topOpportunitySchool
        ? `Top nearby opportunity: ${topOpportunitySchool}, +${topOpportunityActGap || '?'} ACT, ${formattedValue} over 4 years.`
        : 'Top nearby opportunity: none shown.',
      note ? `Family note: ${note}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    const supabase = createAdminSupabaseClient();
    let inquirySaved = false;

    if (supabase) {
      const { error } = await supabase.from('contact_inquiries').insert({
        full_name: fullName,
        email,
        phone: phone || null,
        student_grade: studentGrade || null,
        student_school: null,
        heard_about_us: 'Scholarship calculator',
        interest: 'Scholarship calculator results',
        message
      });

      if (error) {
        console.error('Scholarship calculator lead insert failed:', error);
      }

      inquirySaved = !error;
    }

    try {
      await sendAdminContactInquiryNotification({
        fullName,
        email,
        phone: phone || null,
        studentGrade: studentGrade || null,
        studentSchool: null,
        heardAboutUs: 'Scholarship calculator',
        message
      });
    } catch {
      if (!inquirySaved) {
        return fail(500, {
          message: 'We could not send the scholarship snapshot. Please email hello@actprepclasses.com.',
          values
        });
      }
    }

    return {
      success: true,
      message: 'Thanks. We received the scholarship snapshot and will follow up soon.',
      values: {
        fullName: '',
        email: '',
        phone: '',
        studentGrade: '',
        note: ''
      }
    };
  }
};
