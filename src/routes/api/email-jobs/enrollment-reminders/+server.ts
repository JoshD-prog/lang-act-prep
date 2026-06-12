import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { createAdminSupabaseClient } from '$lib/server/supabase';
import {
  sendEnrollmentFollowUpEmail,
  sendEnrollmentReminderEmail,
  sendScienceLectureAvailableEmail,
  type EnrollmentEmailType
} from '$lib/server/email';

type EmailEventStatus = 'pending' | 'sent' | 'failed' | 'skipped';

interface ExistingEmailEvent {
  id: string;
  status: EmailEventStatus;
}

interface PaidLead {
  id: string;
  student_name: string;
  parent_email: string;
  class_slug: string;
}

interface ClassEmailSchedule {
  slug: string;
  title: string;
  schedule: string | null;
  location: string | null;
  start_date: string | null;
  act_test_date: string | null;
  score_release_date: string | null;
}

interface DueEmail {
  emailType: EnrollmentEmailType;
  scheduledFor: string;
}

const timeZone = 'America/Chicago';
const JUNE_2026_CLASS_SLUG = 'act-cram-june-2026';
const SCIENCE_LECTURE_SEND_DATE = '2026-06-12';

export const GET: RequestHandler = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = new URL(request.url);
  const dryRun = url.searchParams.get('dryRun') === '1';
  const requestedDate = url.searchParams.get('date');
  const requestedClassSlug = url.searchParams.get('classSlug');

  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return Response.json({ sent: 0, failed: 0, skipped: 0, error: 'Supabase is not configured' }, { status: 503 });
  }
  const db = supabase;

  const today = dryRun && isIsoDate(requestedDate) ? requestedDate : getTodayInTimeZone(timeZone);

  let leadsQuery = db
    .from('enrollment_leads')
    .select('id, student_name, parent_email, class_slug')
    .eq('payment_status', 'paid')
    .not('parent_email', 'is', null);

  if (requestedClassSlug) {
    leadsQuery = leadsQuery.eq('class_slug', requestedClassSlug);
  }

  const { data: leads, error: leadsError } = await leadsQuery;

  if (leadsError) {
    console.error('Enrollment email job lead lookup failed:', leadsError);
    return Response.json({ sent: 0, failed: 0, skipped: 0, error: 'Lead lookup failed' }, { status: 500 });
  }

  const classSlugs = [...new Set((leads ?? []).map((lead) => lead.class_slug).filter(Boolean))];
  const classesBySlug = new Map<string, ClassEmailSchedule>();

  if (classSlugs.length > 0) {
    const { data: classRows, error: classesError } = await db
      .from('class_offerings')
      .select('slug, title, schedule, location, start_date, act_test_date, score_release_date')
      .in('slug', classSlugs);

    if (classesError) {
      console.error('Enrollment email job class lookup failed:', classesError);
      return Response.json({ sent: 0, failed: 0, skipped: 0, error: 'Class lookup failed' }, { status: 500 });
    }

    for (const classRow of classRows ?? []) {
      classesBySlug.set(classRow.slug, classRow);
    }
  }

  const counts = { sent: 0, failed: 0, skipped: 0 };
  const due: Array<{
    leadId: string;
    parentEmail: string;
    studentName: string;
    classSlug: string;
    emailType: EnrollmentEmailType;
    scheduledFor: string;
  }> = [];

  for (const lead of (leads ?? []) as PaidLead[]) {
    const classRow = classesBySlug.get(lead.class_slug);
    if (!classRow) {
      continue;
    }

    for (const dueEmail of getDueEmails(classRow, today)) {
      due.push({
        leadId: lead.id,
        parentEmail: lead.parent_email,
        studentName: lead.student_name,
        classSlug: lead.class_slug,
        emailType: dueEmail.emailType,
        scheduledFor: dueEmail.scheduledFor
      });

      if (dryRun) {
        continue;
      }

      const existingEvent = await getExistingEvent(lead.id, dueEmail.emailType);
      if (existingEvent && existingEvent.status !== 'failed') {
        counts.skipped += 1;
        continue;
      }

      const eventId = existingEvent?.id ?? (await insertEvent(lead, dueEmail));
      if (!eventId) {
        counts.skipped += 1;
        continue;
      }

      if (existingEvent?.status === 'failed') {
        await updateEvent(eventId, 'pending');
      }

      try {
        const details = {
          parentEmail: lead.parent_email,
          studentName: lead.student_name,
          classTitle: classRow.title,
          classSchedule: classRow.schedule,
          classLocation: classRow.location,
          actTestDate: classRow.act_test_date,
          scoreReleaseDate: classRow.score_release_date
        };

        const result = isReminder(dueEmail.emailType)
          ? await sendEnrollmentReminderEmail(dueEmail.emailType, details)
          : dueEmail.emailType === 'science_lecture_available'
            ? await sendScienceLectureAvailableEmail(details)
            : await sendEnrollmentFollowUpEmail(dueEmail.emailType, details);

        await updateEvent(eventId, 'sent', getResendMessageId(result));
        counts.sent += 1;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown email send error';
        console.error('Enrollment email send failed:', {
          leadId: lead.id,
          emailType: dueEmail.emailType,
          error
        });
        await updateEvent(eventId, 'failed', null, message);
        counts.failed += 1;
      }
    }
  }

  return Response.json({ today, dryRun, dueCount: due.length, due, ...counts });

  async function getExistingEvent(
    leadId: string,
    emailType: EnrollmentEmailType
  ): Promise<ExistingEmailEvent | null> {
    const { data, error } = await db
      .from('enrollment_email_events')
      .select('id, status')
      .eq('lead_id', leadId)
      .eq('email_type', emailType)
      .limit(1);

    if (error) {
      console.error('Enrollment email event lookup failed:', error);
      return { id: '', status: 'pending' };
    }

    return (data?.[0] as ExistingEmailEvent | undefined) ?? null;
  }

  async function insertEvent(lead: PaidLead, dueEmail: DueEmail) {
    const { data, error } = await db
      .from('enrollment_email_events')
      .insert({
        lead_id: lead.id,
        class_slug: lead.class_slug,
        email_type: dueEmail.emailType,
        recipient_email: lead.parent_email,
        scheduled_for: dueEmail.scheduledFor,
        status: 'pending'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Enrollment email event insert failed:', error);
      return null;
    }

    return data.id as string;
  }

  async function updateEvent(
    eventId: string,
    status: EmailEventStatus,
    resendMessageId?: string | null,
    errorMessage?: string
  ) {
    const { error } = await db
      .from('enrollment_email_events')
      .update({
        status,
        resend_message_id: resendMessageId ?? null,
        error_message: errorMessage ?? null,
        sent_at: status === 'sent' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', eventId);

    if (error) {
      console.error('Enrollment email event update failed:', error);
    }
  }
};

function isAuthorized(request: Request) {
  const cronSecret = env.CRON_SECRET;
  if (!cronSecret) {
    return false;
  }

  return request.headers.get('authorization') === `Bearer ${cronSecret}`;
}

function getDueEmails(classRow: ClassEmailSchedule, today: string): DueEmail[] {
  const dueEmails: DueEmail[] = [];

  addIfDue(dueEmails, 'reminder_2_weeks_before_class', classRow.start_date, -14, today);
  addIfDue(dueEmails, 'reminder_1_week_before_class', classRow.start_date, -7, today);
  addIfDue(dueEmails, 'reminder_1_day_before_class', classRow.start_date, -1, today);
  addIfDue(dueEmails, 'followup_monday_after_test', classRow.act_test_date, 2, today);
  addIfDue(dueEmails, 'followup_after_score_release', classRow.score_release_date, 7, today);
  addJuneScienceLectureIfDue(dueEmails, classRow, today);

  return dueEmails;
}

function addJuneScienceLectureIfDue(
  dueEmails: DueEmail[],
  classRow: ClassEmailSchedule,
  today: string
) {
  if (classRow.slug !== JUNE_2026_CLASS_SLUG || today !== SCIENCE_LECTURE_SEND_DATE) {
    return;
  }

  dueEmails.push({
    emailType: 'science_lecture_available',
    scheduledFor: SCIENCE_LECTURE_SEND_DATE
  });
}

function addIfDue(
  dueEmails: DueEmail[],
  emailType: EnrollmentEmailType,
  anchorDate: string | null,
  offsetDays: number,
  today: string
) {
  if (!anchorDate) {
    return;
  }

  const scheduledFor = addDays(anchorDate, offsetDays);
  if (scheduledFor === today) {
    dueEmails.push({ emailType, scheduledFor });
  }
}

function addDays(date: string, days: number) {
  const [year, month, day] = date.split('-').map(Number);
  const result = new Date(Date.UTC(year, month - 1, day + days));
  return result.toISOString().slice(0, 10);
}

function getTodayInTimeZone(tz: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return `${year}-${month}-${day}`;
}

function isIsoDate(date: string | null): date is string {
  return Boolean(date && /^\d{4}-\d{2}-\d{2}$/.test(date));
}

function isReminder(
  emailType: EnrollmentEmailType
): emailType is Extract<
  EnrollmentEmailType,
  | 'reminder_2_weeks_before_class'
  | 'reminder_1_week_before_class'
  | 'reminder_1_day_before_class'
> {
  return emailType.startsWith('reminder_');
}

function getResendMessageId(result: unknown) {
  if (typeof result !== 'object' || result === null) {
    return null;
  }

  const data = 'data' in result ? (result as { data?: unknown }).data : null;
  if (typeof data === 'object' && data !== null && 'id' in data) {
    return String((data as { id: unknown }).id);
  }

  return null;
}
