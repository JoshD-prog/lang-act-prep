import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { buildParentConfirmationEmailHtml } from "../src/lib/server/email-templates";
import {
  buildEnrollmentFollowUpEmail,
  buildEnrollmentReminderEmail,
} from "../src/lib/server/email-templates";

const outputDir = join(process.cwd(), "tmp", "email-previews");

const sampleDetails = {
  parentEmail: "parent@example.com",
  studentName: "Sample Student",
  classTitle: "June ACT Cram Course",
  classSchedule: "Mon-Thu, June 8-11, 6:30-8:00 PM",
  classLocation: "Shawnee Civic Center - Dogwood Room",
  actTestDate: "2026-06-13",
  scoreReleaseDate: "2026-06-23",
};

const previews = [
  {
    fileName: "01-parent-confirmation.html",
    subject: `Enrollment Confirmation - ${sampleDetails.classTitle}`,
    html: buildParentConfirmationEmailHtml({
      studentName: sampleDetails.studentName,
      classTitle: sampleDetails.classTitle,
      classSchedule: sampleDetails.classSchedule,
      classLocation: sampleDetails.classLocation,
      stripeSessionId: "cs_test_sample_123",
      paymentAmount: 29900,
      paymentCurrency: "usd",
    }),
  },
  {
    fileName: "02-reminder-two-weeks.html",
    ...buildEnrollmentReminderEmail("reminder_2_weeks_before_class", sampleDetails),
  },
  {
    fileName: "03-reminder-one-week.html",
    ...buildEnrollmentReminderEmail("reminder_1_week_before_class", sampleDetails),
  },
  {
    fileName: "04-reminder-one-day.html",
    ...buildEnrollmentReminderEmail("reminder_1_day_before_class", sampleDetails),
  },
  {
    fileName: "05-followup-testimonial.html",
    ...buildEnrollmentFollowUpEmail("followup_monday_after_test", sampleDetails),
  },
  {
    fileName: "06-followup-score-release.html",
    ...buildEnrollmentFollowUpEmail("followup_after_score_release", sampleDetails),
  },
];

await mkdir(outputDir, { recursive: true });

const indexLinks: string[] = [];

for (const preview of previews) {
  const document = wrapEmailPreview(preview.subject, preview.html);
  await writeFile(join(outputDir, preview.fileName), document, "utf8");
  indexLinks.push(`<li><a href="./${preview.fileName}">${preview.subject}</a></li>`);
}

await writeFile(
  join(outputDir, "index.html"),
  wrapPage("Email previews", `<h1>Email previews</h1><ul>${indexLinks.join("\n")}</ul>`),
  "utf8",
);

console.log(`Generated ${previews.length} email previews in ${outputDir}`);
console.log(join(outputDir, "index.html"));

function wrapEmailPreview(subject: string, html: string) {
  return wrapPage(
    subject,
    `
      <p class="subject"><strong>Subject:</strong> ${escapePreviewText(subject)}</p>
      <div class="email-body">${html}</div>
    `,
  );
}

function wrapPage(title: string, body: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapePreviewText(title)}</title>
    <style>
      body {
        margin: 0;
        background: #f6f7f9;
        color: #172033;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.5;
      }
      main {
        max-width: 760px;
        margin: 0 auto;
        padding: 32px 20px;
      }
      .subject {
        color: #475569;
      }
      .email-body {
        background: #ffffff;
        border: 1px solid #d9e1ea;
        padding: 28px;
      }
      h1 {
        font-size: 28px;
      }
      h2 {
        margin-top: 24px;
        font-size: 18px;
      }
      a {
        color: #075985;
      }
    </style>
  </head>
  <body>
    <main>${body}</main>
  </body>
</html>`;
}

function escapePreviewText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
