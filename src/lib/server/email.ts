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

export async function sendAdminContactInquiryNotification({
  fullName,
  email,
  phone,
  studentGrade,
  studentSchool,
  message,
}: {
  fullName: string;
  email: string;
  phone?: string | null;
  studentGrade?: string | null;
  studentSchool?: string | null;
  message: string;
}) {
  await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    to: "director@kccramcourse.com",
    replyTo: email,
    subject: `New Contact Inquiry - ${fullName}`,
    html: `
      <p>A new contact inquiry was submitted.</p>

      <p>
        <strong>Name:</strong> ${fullName}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Phone:</strong> ${phone || "Not provided"}<br/>
        <strong>Student Grade:</strong> ${studentGrade || "Not provided"}<br/>
        <strong>Student School:</strong> ${studentSchool || "Not provided"}
      </p>

      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}
