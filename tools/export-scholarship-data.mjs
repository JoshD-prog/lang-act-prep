import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { createClient } from '@supabase/supabase-js';

const envPath = new URL('../.env', import.meta.url);

if (process.argv.includes('--help')) {
  console.log(`Usage:
  npm run scholarships:export
  npm run scholarships:export -- --output=tmp/scholarship-rows.json

Environment:
  SCHOLARSHIP_EXPORT_OUTPUT=path/to/file  Override the output path.`);
  process.exit(0);
}

function loadDotEnv() {
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function getOutputPath() {
  const outputArg = process.argv.find((argument) => argument.startsWith('--output='));
  return outputArg?.slice('--output='.length) ?? process.env.SCHOLARSHIP_EXPORT_OUTPUT ?? 'tmp/scholarship-rows.json';
}

loadDotEnv();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const { data, error } = await supabase
  .from('scholarship_tiers_with_school')
  .select('*')
  .eq('school_is_active', true)
  .eq('tier_is_active', true)
  .order('school_slug', { ascending: true })
  .order('tier_rank', { ascending: true });

if (error) {
  console.error(`Unable to export scholarship rows: ${error.message}`);
  if (error.cause?.message) {
    console.error(`Cause: ${error.cause.message}`);
  }
  process.exit(1);
}

const outputPath = getOutputPath();
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(data ?? [], null, 2));

console.log(`Exported ${(data ?? []).length} scholarship rows to ${outputPath}.`);
