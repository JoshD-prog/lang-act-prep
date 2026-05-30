const [, , baseUrlArg, dateArg, classSlugArg] = process.argv;

const baseUrl = baseUrlArg ?? process.env.PUBLIC_SITE_URL ?? "http://localhost:5173";
const date = dateArg ?? new Date().toISOString().slice(0, 10);
const classSlug = classSlugArg ?? "";
const cronSecret = process.env.CRON_SECRET;

if (!cronSecret) {
  console.error("Missing CRON_SECRET in environment.");
  process.exit(1);
}

const url = new URL("/api/email-jobs/enrollment-reminders", baseUrl);
url.searchParams.set("dryRun", "1");
url.searchParams.set("date", date);

if (classSlug) {
  url.searchParams.set("classSlug", classSlug);
}

const response = await fetch(url, {
  headers: {
    authorization: `Bearer ${cronSecret}`,
  },
});

const body = await response.text();

if (!response.ok) {
  console.error(`Dry run failed with ${response.status}:`);
  console.error(body);
  process.exit(1);
}

console.log(body);
