import { Resend } from "resend";
import { RESEND_API_KEY } from "$env/static/private";
import { buildParentConfirmationEmailHtml } from "$lib/server/email-templates";

export const resend = new Resend(RESEND_API_KEY);

export async function sendParentConfirmationEmail({
  parentEmail,
  studentName,
  classTitle,
  classSchedule,
  classLocation,
}: {
  parentEmail: string;
  studentName: string;
  classTitle: string;
  classSchedule?: string;
  classLocation?: string;
}) {
  await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    replyTo: "director@kccramcourse.com",
    to: parentEmail,
    subject: `Enrollment Confirmed - ${classTitle}`,
    html: buildParentConfirmationEmailHtml({
      studentName,
      classTitle,
      classSchedule,
      classLocation,
    }),
  });
}

export async function sendAdminEnrollmentNotification({
  studentName,
  parentEmail,
  classTitle,
  classSchedule,
  leadId,
}: {
  studentName: string;
  parentEmail: string;
  classTitle: string;
  classSchedule?: string;
  leadId: string;
}) {
  await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    to: "director@kccramcourse.com",
    subject: "New Enrollment - KC Cram Course",
    html: `
      <p>A new enrollment has been completed.</p>

      <p>
        <strong>Student:</strong> ${studentName}<br/>
        <strong>Parent Email:</strong> ${parentEmail}<br/>
        <strong>Class:</strong> ${classTitle}<br/>
        <strong>Schedule:</strong> ${classSchedule ?? ""}
      </p>

      <p>Lead ID: ${leadId}</p>
    `,
  });
}
