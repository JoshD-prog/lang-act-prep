import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

export const resend = new Resend(RESEND_API_KEY);

export async function sendParentConfirmationEmail({
  parentEmail,
  studentName,
  classTitle,
  classSchedule,
  classLocation
}: {
  parentEmail: string;
  studentName: string;
  classTitle: string;
  classSchedule?: string;
  classLocation?: string;
}) {
  await resend.emails.send({
    from: 'KC Cram Course <noreply@kccramcourse.com>',
    to: parentEmail,
    subject: `Enrollment Confirmed — ${classTitle}`,
    html: `
      <p>Hello,</p>

      <p>Your student <strong>${studentName}</strong> has been successfully enrolled in <strong>${classTitle}</strong>.</p>

      <p><strong>Course Details</strong></p>

      <p>
        <strong>Class:</strong> ${classTitle}<br/>
        <strong>Dates & Time:</strong> ${classSchedule ?? 'Details coming soon'}<br/>
        <strong>Location:</strong> ${classLocation ?? 'Details coming soon'}
      </p>

      <p>Your seat is now reserved. Please keep this email for your records.</p>

      <p>If you have any questions before the course begins, you can reply directly to this email.</p>

      <p>Thank you for enrolling.</p>
    `
  });
}

export async function sendAdminEnrollmentNotification({
  studentName,
  parentEmail,
  classTitle,
  classSchedule,
  leadId
}: {
  studentName: string;
  parentEmail: string;
  classTitle: string;
  classSchedule?: string;
  leadId: string;
}) {
  await resend.emails.send({
    from: 'KC Cram Course <noreply@kccramcourse.com>',
    to: 'director@kccramcourse.com',
    subject: 'New Enrollment — KC Cram Course',
    html: `
      <p>A new enrollment has been completed.</p>

      <p>
        <strong>Student:</strong> ${studentName}<br/>
        <strong>Parent Email:</strong> ${parentEmail}<br/>
        <strong>Class:</strong> ${classTitle}<br/>
        <strong>Schedule:</strong> ${classSchedule ?? ''}
      </p>

      <p>Lead ID: ${leadId}</p>
    `
  });
}