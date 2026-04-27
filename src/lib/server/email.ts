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
  await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    replyTo: "director@kccramcourse.com",
    to: parentEmail,
    subject: `Enrollment Records - ${classTitle}`,
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
  await resend.emails.send({
    from: "KC Cram Course <noreply@kccramcourse.com>",
    to: "director@kccramcourse.com",
    subject: "New Enrollment - KC Cram Course",
    html: `
      <p>A new enrollment has been completed.</p>

      <p>
        <strong>Student:</strong> ${studentName}<br/>
        <strong>Parent Email:</strong> ${parentEmail}<br/>
        <strong>How They Heard About Us:</strong> ${heardAboutUs || "Not provided"}<br/>
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
  heardAboutUs,
  message,
}: {
  fullName: string;
  email: string;
  phone?: string | null;
  studentGrade?: string | null;
  studentSchool?: string | null;
  heardAboutUs?: string | null;
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
        <strong>Student School:</strong> ${studentSchool || "Not provided"}<br/>
        <strong>How They Heard About Us:</strong> ${heardAboutUs || "Not provided"}
      </p>

      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}
