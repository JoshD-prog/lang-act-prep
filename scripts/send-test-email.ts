import { Resend } from 'resend';
import { buildParentConfirmationEmailHtml } from '../src/lib/server/email-templates';

const [, , to, studentNameArg, classSlugArg] = process.argv;

if (!to) {
  console.error(
    'Usage: bun run email:test <to-email> [student-name] [class-slug]'
  );
  process.exit(1);
}

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('Missing RESEND_API_KEY in environment.');
  process.exit(1);
}

const presets: Record<
  string,
  {
    classTitle: string;
    classSchedule: string;
    classLocation: string;
  }
> = {
  'act-cram-june-2026': {
    classTitle: 'June ACT Cram Course',
    classSchedule: 'Mon-Thu, June 8-11, 6:30-8:00 PM',
    classLocation: 'Shawnee Civic Center - Dogwood Room'
  },
  'act-cram-july-2026': {
    classTitle: 'July ACT Cram Course',
    classSchedule: 'Mon-Thu, July 6-9, 6:30-8:00 PM',
    classLocation: 'Shawnee Civic Center - Dogwood Room'
  },
  'act-cram-september-2026': {
    classTitle: 'September ACT Cram Course',
    classSchedule: 'Mon-Thu, September 14-17, 6:30-8:00 PM',
    classLocation: 'Piper Location'
  }
};

const preset = presets[classSlugArg ?? 'act-cram-june-2026'] ?? presets['act-cram-june-2026'];
const studentName = studentNameArg ?? 'Test Student';

const resend = new Resend(resendApiKey);

const result = await resend.emails.send({
  from: 'KC Cram Course <noreply@kccramcourse.com>',
  replyTo: 'director@kccramcourse.com',
  to,
  subject: `Enrollment Confirmed - ${preset.classTitle}`,
  html: buildParentConfirmationEmailHtml({
    studentName,
    classTitle: preset.classTitle,
    classSchedule: preset.classSchedule,
    classLocation: preset.classLocation
  })
});

console.log('Test email request sent.');
console.log(result);
