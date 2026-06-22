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

      <p>Thank you for enrolling <strong>${safeStudentName}</strong> in <strong>${safeClassTitle}</strong>. Your student's seat is confirmed.</p>

      <p>This email includes the class details, payment record, and enrollment information for your records. Please keep it with your Stripe receipt.</p>

      <h2>Class details</h2>
      <p>
        <strong>Student:</strong> ${safeStudentName}<br/>
        <strong>Class:</strong> ${safeClassTitle}<br/>
        <strong>Dates and time:</strong> ${safeClassSchedule}<br/>
        <strong>Location:</strong> ${safeClassLocation}
      </p>

      <h2>Payment details</h2>
      <p>
        ${formattedPaymentAmount ? `<strong>Amount paid:</strong> ${formattedPaymentAmount}<br/>` : ""}
        ${safeStripeSessionId ? `<strong>Stripe checkout reference:</strong> ${safeStripeSessionId}<br/>` : ""}
        Stripe may also send a separate payment receipt depending on receipt settings.
      </p>

      <h2>What the course covers</h2>
      <p>
        KC Cram Course is a structured ACT preparation course focused on academic test-taking skills, English, math, reading, science reasoning, pacing, and score-improvement strategy. Students receive live instruction, guided practice, and review during scheduled class sessions.
      </p>

      <p>If you plan to ask a 529 plan administrator or tax professional about reimbursement, this confirmation may help document the enrollment, schedule, payment, and academic nature of the course. It does not determine whether a 529 plan will treat the course as an eligible expense.</p>

      <p>If you have any questions before the course begins, you can reply to this email and we will be happy to help.</p>

      <p>Thank you for enrolling.</p>
    `;
}

export type EnrollmentEmailType =
  | 'reminder_2_weeks_before_class'
  | 'reminder_1_week_before_class'
  | 'reminder_1_day_before_class'
  | 'followup_monday_after_test'
  | 'followup_after_score_release'
  | 'science_lecture_available';

export interface EnrollmentEmailDetails {
  parentEmail: string;
  studentName: string;
  classTitle: string;
  classSchedule?: string | null;
  classLocation?: string | null;
  actTestDate?: string | null;
  scoreReleaseDate?: string | null;
}

export function buildEnrollmentReminderEmail(
  emailType: Extract<
    EnrollmentEmailType,
    | 'reminder_2_weeks_before_class'
    | 'reminder_1_week_before_class'
    | 'reminder_1_day_before_class'
  >,
  details: EnrollmentEmailDetails
) {
  const safeStudentName = escapeHtml(details.studentName);
  const safeClassTitle = escapeHtml(details.classTitle);
  const subjectClassTitle = details.classTitle;
  const safeSchedule = escapeHtml(details.classSchedule || "Schedule details coming soon.");
  const safeLocation = escapeHtml(details.classLocation || "Location details coming soon.");
  const safeActTestDate = escapeHtml(formatDate(details.actTestDate) || "your ACT test date");

  if (emailType === 'reminder_2_weeks_before_class') {
    return {
      subject: `${subjectClassTitle} starts in two weeks`,
      html: `
        <p>Hello,</p>
        <p>I am looking forward to working with <strong>${safeStudentName}</strong> in <strong>${safeClassTitle}</strong>. The course starts in two weeks, so this is a good time to make sure your student has a recent ACT or practice-test score ready to use during class.</p>
        ${classDetailsHtml(safeSchedule, safeLocation)}
        <p>For the best results, students should arrive having already completed an official ACT or a full-length practice test, with scores reviewed and ready to discuss. A full-length practice test is available in the <a href="https://www.kccramcourse.com/resources">resources section of our website</a>. That gives us a clearer starting point and helps students connect the strategies to their own results.</p>
        ${bringToClassHtml()}
        <p>Thank you,</p>
        <p>KC Cram Course</p>
      `
    };
  }

  if (emailType === 'reminder_1_week_before_class') {
    return {
      subject: `${subjectClassTitle} starts next week`,
      html: `
        <p>Hello,</p>
        <p><strong>${safeClassTitle}</strong> starts next week for <strong>${safeStudentName}</strong>. I am excited to have your student in class and want to make sure they come in ready to get as much value as possible from the week.</p>
        ${classDetailsHtml(safeSchedule, safeLocation)}
        <p>Please have your student complete and score either an official ACT or a full-length practice test before the first session if possible. A full-length practice test is available in the <a href="https://www.kccramcourse.com/resources">resources section of our website</a>. If they already have ACT results, they should bring those too. These results help us focus on the decisions, timing, and content areas that matter most for them.</p>
        <p>If your student plans to bring their own device for the actual ACT, please have them check early this week that the computer is compatible and can run ACT Gateway.</p>
        ${bringToClassHtml()}
        <p>Thank you,</p>
        <p>KC Cram Course</p>
      `
    };
  }

  return {
    subject: `${subjectClassTitle} starts tomorrow`,
    html: `
      <p>Hello,</p>
      <p><strong>${safeClassTitle}</strong> starts tomorrow for <strong>${safeStudentName}</strong>. I am looking forward to meeting your student and helping them make the final week before the ACT more focused and productive.</p>
      ${classDetailsHtml(safeSchedule, safeLocation)}
      ${bringToClassHtml()}
      <h2>ACT test day reminder</h2>
      <p>For the ACT on ${safeActTestDate}, students should review their ACT admission ticket and photo ID requirements, plan to arrive at the test center by the required check-in time, and bring only ACT-approved items.</p>
      <p>ACT lists admission ticket, acceptable photo ID, No. 2 pencils, a permitted calculator, approved timing device, snacks for break, and a fully charged laptop and charger for students registered for online testing with Bring Your Own Device. ACT also warns against bringing notes, books, distracting electronics, smart watches, or other prohibited devices.</p>
      <p>Thank you,</p>
      <p>KC Cram Course</p>
    `
  };
}

export function buildEnrollmentFollowUpEmail(
  emailType: Extract<
    EnrollmentEmailType,
    'followup_monday_after_test' | 'followup_after_score_release'
  >,
  details: EnrollmentEmailDetails
) {
  const safeStudentName = escapeHtml(details.studentName);
  const safeClassTitle = escapeHtml(details.classTitle);
  const safeScoreReleaseDate = escapeHtml(
    formatDate(details.scoreReleaseDate) || "the initial score release date"
  );

  if (emailType === 'followup_monday_after_test') {
    return {
      subject: `Thank you from KC Cram Course`,
      html: `
        <p>Hello,</p>
        <p>Thank you for having <strong>${safeStudentName}</strong> join <strong>${safeClassTitle}</strong>. I enjoyed working with the students, and I hope the course helped make test day feel more focused and manageable.</p>
        <p>If you are willing, please reply to this email with a short, honest testimonial about your family's experience. A few candid sentences are very helpful as this program grows, especially for families who are trying to decide whether the course is a good fit.</p>
        <p>As a thank-you, I will send a $10 Amazon e-gift card for a testimonial response.</p>
        <p>Thank you,</p>
        <p>Adam Lang</p>
      `
    };
  }

  return {
    subject: `How did the ACT go?`,
    html: `
      <p>Hello,</p>
      <p>ACT's initial score release date for this test was ${safeScoreReleaseDate}, and I would love to hear how <strong>${safeStudentName}</strong> did.</p>
      <p>Even a short reply would be very helpful. If you know how much their scores improved in each category that would be great, but I'd love to at least hear how much their composite score improved.</p>
      <p>As a thank-you, I will send a $10 Amazon e-gift card when you reply and let me know how the ACT went.</p>
      <p>Also, if you did not respond to the earlier testimonial email, that offer is still open too. You can either reply with a short testimonial or leave a Google review here: <a href="https://g.page/r/CVduEj9ru6MqEBI/review">https://g.page/r/CVduEj9ru6MqEBI/review</a>. I will send an additional $10 Amazon e-gift card for either one.</p>
      <p>If you have any other feedback for me, please let me know! I am grateful for any feedback that helps me improve the class for future students.</p>
      <p>Thank you,</p>
      <p>Adam Lang</p>
    `
  };
}

export function buildScienceLectureAvailableEmail(details: EnrollmentEmailDetails) {
  const lectureUrl = 'https://www.kccramcourse.com/resources/optional-science-test';

  return {
    subject: `Optional ACT science lecture is available`,
    html: `
      <p>Hello,</p>
      <p>I recorded a short lecture for students who are taking the optional ACT science test this weekend. It is now available here:</p>
      <p><a href="${lectureUrl}">${lectureUrl}</a></p>
      <p>If your student is taking science, I recommend watching it before test day.</p>
      <p>Thank you,</p>
      <p>Adam Lang</p>
    `
  };
}

function classDetailsHtml(schedule: string, location: string) {
  return `
    <h2>Class details</h2>
    <p>
      <strong>Schedule:</strong> ${schedule}<br/>
      <strong>Location:</strong> ${location}
    </p>
  `;
}

function bringToClassHtml() {
  return `
    <h2>What to bring to class</h2>
    <ul>
      <li>The approved calculator your student plans to use on test day</li>
      <li>Pencils and notebook paper</li>
      <li>A water bottle</li>
      <li>Most recent ACT score report, completed practice test, or questions they want reviewed</li>
      <li>Anything they want me to look at or double-check for them</li>
    </ul>
    <p>Please do not bring anything that will distract from active participation. Students will receive a course binder with everything they need to prepare for the test.</p>
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

function formatDate(date: string | null | undefined) {
  if (!date) {
    return "";
  }

  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
