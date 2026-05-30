import { Resend } from "resend";
import { RESEND_API_KEY } from "$env/static/private";
import {
  buildEnrollmentFollowUpEmail,
  buildEnrollmentReminderEmail,
  buildParentConfirmationEmailHtml,
  escapeHtml,
  type EnrollmentEmailDetails,
  type EnrollmentEmailType,
} from "$lib/server/email-templates";

export const resend = new Resend(RESEND_API_KEY);

export async function sendParentConfirmationEmail({
  parentEmail,
  studentName,
  classTitle,
  classSchedule,
  classLocation,
  stripeSessionId,
  paymentAmount,
  paymentCurrency,
}: {
  parentEmail: string;
  studentName: string;
  classTitle: string;
  classSchedule?: string;
  classLocation?: string;
  stripeSessionId?: string;
  paymentAmount?: number | null;
  paymentCurrency?: string | null;
}) {
  const result = await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    replyTo: "director@kccramcourse.com",
    to: parentEmail,
    subject: `Enrollment Confirmation - ${classTitle}`,
    html: buildParentConfirmationEmailHtml({
      studentName,
      classTitle,
      classSchedule,
      classLocation,
      stripeSessionId,
      paymentAmount,
      paymentCurrency,
    }),
  });

  throwIfResendError(result);
  return result;
}

export async function sendAdminEnrollmentNotification({
  studentName,
  parentEmail,
  heardAboutUs,
  classTitle,
  classSchedule,
  leadId,
}: {
  studentName: string;
  parentEmail: string;
  heardAboutUs?: string | null;
  classTitle: string;
  classSchedule?: string;
  leadId: string;
}) {
  const safeStudentName = escapeHtml(studentName);
  const safeParentEmail = escapeHtml(parentEmail);
  const safeHeardAboutUs = escapeHtml(heardAboutUs || "Not provided");
  const safeClassTitle = escapeHtml(classTitle);
  const safeClassSchedule = escapeHtml(classSchedule ?? "");
  const safeLeadId = escapeHtml(leadId);

  const result = await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    to: "director@kccramcourse.com",
    subject: "New Enrollment - KC Cram Course",
    html: `
      <p>A new enrollment has been completed.</p>

      <p>
        <strong>Student:</strong> ${safeStudentName}<br/>
        <strong>Parent Email:</strong> ${safeParentEmail}<br/>
        <strong>How They Heard About Us:</strong> ${safeHeardAboutUs}<br/>
        <strong>Class:</strong> ${safeClassTitle}<br/>
        <strong>Schedule:</strong> ${safeClassSchedule}
      </p>

      <p>Lead ID: ${safeLeadId}</p>
    `,
  });

  throwIfResendError(result);
  return result;
}

export async function sendAdminContactInquiryNotification({
  fullName,
  email,
  phone,
  studentGrade,
  studentSchool,
  heardAboutUs,
  interest,
  message,
}: {
  fullName: string;
  email: string;
  phone?: string | null;
  studentGrade?: string | null;
  studentSchool?: string | null;
  heardAboutUs?: string | null;
  interest?: string | null;
  message: string;
}) {
  const safeFullName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeStudentGrade = escapeHtml(studentGrade || "Not provided");
  const safeStudentSchool = escapeHtml(studentSchool || "Not provided");
  const safeInterest = escapeHtml(interest || "Not provided");
  const safeHeardAboutUs = escapeHtml(heardAboutUs || "Not provided");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  const result = await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    to: "director@kccramcourse.com",
    replyTo: email,
    subject: `New Contact Inquiry - ${fullName}`,
    html: `
      <p>A new contact inquiry was submitted.</p>

      <p>
        <strong>Name:</strong> ${safeFullName}<br/>
        <strong>Email:</strong> ${safeEmail}<br/>
        <strong>Phone:</strong> ${safePhone}<br/>
        <strong>Student Grade:</strong> ${safeStudentGrade}<br/>
        <strong>Student School:</strong> ${safeStudentSchool}<br/>
        <strong>Interest:</strong> ${safeInterest}<br/>
        <strong>How They Heard About Us:</strong> ${safeHeardAboutUs}
      </p>

      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  });

  throwIfResendError(result);
  return result;
}

export type { EnrollmentEmailDetails, EnrollmentEmailType };

export async function sendEnrollmentReminderEmail(
  emailType: Extract<
    EnrollmentEmailType,
    | 'reminder_2_weeks_before_class'
    | 'reminder_1_week_before_class'
    | 'reminder_1_day_before_class'
  >,
  details: EnrollmentEmailDetails
) {
  const { subject, html } = buildEnrollmentReminderEmail(emailType, details);

  const result = await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    replyTo: "director@kccramcourse.com",
    to: details.parentEmail,
    subject,
    html,
  });

  throwIfResendError(result);
  return result;
}

export async function sendEnrollmentFollowUpEmail(
  emailType: Extract<
    EnrollmentEmailType,
    'followup_monday_after_test' | 'followup_after_score_release'
  >,
  details: EnrollmentEmailDetails
) {
  const { subject, html } = buildEnrollmentFollowUpEmail(emailType, details);

  const result = await resend.emails.send({
    from: "Adam Lang <director@kccramcourse.com>",
    replyTo: "director@kccramcourse.com",
    to: details.parentEmail,
    subject,
    html,
  });

  throwIfResendError(result);
  return result;
}

function throwIfResendError(result: unknown) {
  if (typeof result !== 'object' || result === null || !('error' in result)) {
    return;
  }

  const error = (result as { error?: unknown }).error;
  if (!error) {
    return;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    throw new Error(String((error as { message: unknown }).message));
  }

  throw new Error(String(error));
}
