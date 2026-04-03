export function buildParentConfirmationEmailHtml({
  studentName,
  classTitle,
  classSchedule,
  classLocation
}: {
  studentName: string;
  classTitle: string;
  classSchedule?: string;
  classLocation?: string;
}) {
  return `
      <p>Hello,</p>

      <p>Your student <strong>${studentName}</strong> is confirmed for <strong>${classTitle}</strong>.</p>

      <p>Here are the class details for your records:</p>

      <p>
        <strong>Class:</strong> ${classTitle}<br/>
        <strong>Dates & Time:</strong> ${classSchedule ?? 'We will send your schedule soon.'}<br/>
        <strong>Location:</strong> ${classLocation ?? 'We will send the location soon.'}
      </p>

      <p>Your seat is reserved. Please keep this email for your records.</p>

      <p>If you have any questions before the course begins, you can reply to this email and we will be happy to help.</p>

      <p>Thank you for enrolling.</p>
    `;
}
