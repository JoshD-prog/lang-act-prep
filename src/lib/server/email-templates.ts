export function buildParentConfirmationEmailHtml({
  studentName,
  classTitle,
  classSchedule,
  classLocation,
  stripeSessionId,
  paymentAmount,
  paymentCurrency,
}: {
  studentName: string;
  classTitle: string;
  classSchedule?: string;
  classLocation?: string;
  stripeSessionId?: string;
  paymentAmount?: number | null;
  paymentCurrency?: string | null;
}) {
  const safeStudentName = escapeHtml(studentName);
  const safeClassTitle = escapeHtml(classTitle);
  const safeClassSchedule = escapeHtml(classSchedule ?? "We will send your schedule soon.");
  const safeClassLocation = escapeHtml(classLocation ?? "We will send the location soon.");
  const safeStripeSessionId = stripeSessionId ? escapeHtml(stripeSessionId) : "";
  const formattedPaymentAmount = formatPaymentAmount(paymentAmount, paymentCurrency);

  return `
      <p>Hello,</p>

      <p>Your student <strong>${safeStudentName}</strong> is confirmed for <strong>${safeClassTitle}</strong>.</p>

      <p>Please keep this confirmation with your Stripe payment receipt for your records. Families who plan to ask a 529 plan administrator or tax professional about reimbursement can use the details below as enrollment documentation.</p>

      <h2>Enrollment verification</h2>
      <p>
        <strong>Student:</strong> ${safeStudentName}<br/>
        <strong>Class:</strong> ${safeClassTitle}<br/>
        <strong>Dates & Time:</strong> ${safeClassSchedule}<br/>
        <strong>Location:</strong> ${safeClassLocation}
      </p>

      <h2>Payment record</h2>
      <p>
        ${formattedPaymentAmount ? `<strong>Amount paid:</strong> ${formattedPaymentAmount}<br/>` : ""}
        ${safeStripeSessionId ? `<strong>Stripe checkout reference:</strong> ${safeStripeSessionId}<br/>` : ""}
        A Stripe payment receipt may also be sent separately by Stripe, depending on receipt settings.
      </p>

      <h2>Course description</h2>
      <p>
        KC Cram Course is a structured ACT preparation course focused on academic test-taking skills, English, math, reading, science reasoning, pacing, and score-improvement strategy. Instruction is delivered through scheduled class sessions with guided practice and review.
      </p>

      <h2>Records included</h2>
      <ul>
        <li>Named student enrollment verification</li>
        <li>Program schedule confirmation</li>
        <li>Payment amount and Stripe checkout reference</li>
        <li>Course description showing structured academic instruction</li>
      </ul>

      <p>This email is provided for recordkeeping and does not determine whether a 529 plan will treat the course as an eligible expense. Please confirm eligibility with your plan administrator or tax professional.</p>

      <p>If you have any questions before the course begins, you can reply to this email and we will be happy to help.</p>

      <p>Thank you for enrolling.</p>
    `;
}

function formatPaymentAmount(amountInCents?: number | null, currency?: string | null) {
  if (typeof amountInCents !== "number" || !currency) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
