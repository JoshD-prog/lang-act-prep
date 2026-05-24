import { readFileSync, existsSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const envPath = new URL('../.env', import.meta.url);

if (process.argv.includes('--help')) {
  console.log(`Usage:
  npm run scholarships:audit
  npm run scholarships:audit -- --input=path/to/scholarship_rows.json
  npm run scholarships:audit -- --input=path/to/scholarship_rows.csv

Environment:
  SCHOLARSHIP_AUDIT_INPUT=path/to/file  Use a local JSON or CSV export instead of Supabase.

JSON input may be an array of rows or an object with a data array.`);
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

function normalizeStates(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => String(item).toUpperCase()).sort();

  return String(value)
    .replace(/[{}]/g, '')
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean)
    .sort();
}

function formatRow(row) {
  return `${row.school_slug} / ${row.tier_name}`;
}

function addIssue(issues, severity, row, message) {
  issues.push({
    severity,
    school: row.school_slug,
    tier: row.tier_name,
    message: `${formatRow(row)}: ${message}`
  });
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && inQuotes && nextCharacter === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (character === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += character;
  }

  values.push(current);
  return values;
}

function parseCsvRows(contents) {
  const lines = contents.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function nullableString(value) {
  if (value == null) return null;
  const stringValue = String(value).trim();
  return stringValue ? stringValue : null;
}

function nullableNumber(value) {
  if (value == null || value === '') return null;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function booleanValue(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (value == null || value === '') return fallback;

  return ['true', 't', 'yes', 'y', '1'].includes(String(value).trim().toLowerCase());
}

function coerceRow(row) {
  return {
    ...row,
    school_slug: nullableString(row.school_slug) ?? '',
    school_name: nullableString(row.school_name),
    short_name: nullableString(row.short_name),
    bucket_default: booleanValue(row.bucket_default),
    bucket_local: booleanValue(row.bucket_local),
    bucket_best_value: booleanValue(row.bucket_best_value),
    tier_name: nullableString(row.tier_name) ?? '',
    tier_rank: nullableNumber(row.tier_rank),
    min_unweighted_gpa: nullableNumber(row.min_unweighted_gpa),
    max_unweighted_gpa: nullableNumber(row.max_unweighted_gpa),
    min_act: nullableNumber(row.min_act),
    max_act: nullableNumber(row.max_act),
    annual_award_usd: nullableNumber(row.annual_award_usd) ?? 0,
    years_assumed: nullableNumber(row.years_assumed) ?? 4,
    projected_total_usd: nullableNumber(row.projected_total_usd) ?? 0,
    residency_rule_type: nullableString(row.residency_rule_type) ?? 'all_students',
    eligible_states: Array.isArray(row.eligible_states)
      ? row.eligible_states
      : normalizeStates(row.eligible_states),
    regional_rule_note: nullableString(row.regional_rule_note),
    requires_separate_application: booleanValue(row.requires_separate_application),
    application_note: nullableString(row.application_note),
    renewable: booleanValue(row.renewable, true),
    renewal_note: nullableString(row.renewal_note),
    is_competitive: booleanValue(row.is_competitive),
    source_url: nullableString(row.source_url),
    source_note: nullableString(row.source_note),
    scholarship_page_url: nullableString(row.scholarship_page_url),
    school_notes_short: nullableString(row.school_notes_short),
    school_is_active: booleanValue(row.school_is_active, true),
    tier_is_active: booleanValue(row.tier_is_active, true),
    tier_last_updated: nullableString(row.tier_last_updated),
    school_last_updated: nullableString(row.school_last_updated)
  };
}

function getInputPath() {
  const inputArg = process.argv.find((argument) => argument.startsWith('--input='));
  return inputArg?.slice('--input='.length) ?? process.env.SCHOLARSHIP_AUDIT_INPUT ?? null;
}

function getRowsFromFile(inputPath) {
  const contents = readFileSync(inputPath, 'utf8');

  if (inputPath.toLowerCase().endsWith('.json')) {
    const parsed = JSON.parse(contents);
    const rows = Array.isArray(parsed) ? parsed : parsed.data;
    if (!Array.isArray(rows)) {
      throw new Error('JSON input must be an array or an object with a data array.');
    }

    return rows.map(coerceRow);
  }

  if (inputPath.toLowerCase().endsWith('.csv')) {
    return parseCsvRows(contents).map(coerceRow);
  }

  throw new Error('Input file must be .json or .csv.');
}

async function getRowsFromSupabase() {
  loadDotEnv();

  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const { data, error } = await supabase
    .from('scholarship_tiers_with_school')
    .select(
      `
      school_slug,
      school_name,
      short_name,
      bucket_default,
      bucket_local,
      bucket_best_value,
      tier_name,
      tier_rank,
      min_unweighted_gpa,
      max_unweighted_gpa,
      min_act,
      max_act,
      annual_award_usd,
      years_assumed,
      projected_total_usd,
      residency_rule_type,
      eligible_states,
      regional_rule_note,
      requires_separate_application,
      application_note,
      renewable,
      renewal_note,
      is_competitive,
      source_url,
      source_note,
      scholarship_page_url,
      school_notes_short,
      school_is_active,
      tier_is_active,
      tier_last_updated,
      school_last_updated
    `
    )
    .eq('school_is_active', true)
    .eq('tier_is_active', true)
    .order('school_slug', { ascending: true })
    .order('tier_rank', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(coerceRow);
}

async function getRows() {
  const inputPath = getInputPath();

  if (inputPath) {
    console.log(`Using local audit input: ${inputPath}`);
    return getRowsFromFile(inputPath);
  }

  return getRowsFromSupabase();
}

let rows;

try {
  rows = await getRows();
} catch (error) {
  console.error(`Unable to load scholarship rows: ${error.message}`);
  if (error.cause?.message) {
    console.error(`Cause: ${error.cause.message}`);
  }
  process.exit(1);
}

const issues = [];
const duplicateKeys = new Map();
const schoolSlugs = new Set();
const modeledSchools = new Set();
const noActSchools = new Set();
const noGpaSchools = new Set();
const missingSourceSchools = new Set();
const missingUpdatedSchools = new Set();

for (const row of rows) {
  schoolSlugs.add(row.school_slug);

  if (!row.school_slug) {
    addIssue(issues, 'error', row, 'missing school_slug.');
  }

  if (!row.tier_name) {
    addIssue(issues, 'error', row, 'missing tier_name.');
  }

  if (row.tier_rank == null || row.tier_rank < 1) {
    addIssue(issues, 'error', row, 'missing or invalid tier_rank.');
  }

  if (row.min_unweighted_gpa != null && (row.min_unweighted_gpa < 0 || row.min_unweighted_gpa > 4)) {
    addIssue(issues, 'error', row, 'min GPA must be between 0.00 and 4.00.');
  }

  if (row.max_unweighted_gpa != null && (row.max_unweighted_gpa < 0 || row.max_unweighted_gpa > 4)) {
    addIssue(issues, 'error', row, 'max GPA must be between 0.00 and 4.00.');
  }

  if (row.min_act != null && (row.min_act < 1 || row.min_act > 36)) {
    addIssue(issues, 'error', row, 'min ACT must be between 1 and 36.');
  }

  if (row.max_act != null && (row.max_act < 1 || row.max_act > 36)) {
    addIssue(issues, 'error', row, 'max ACT must be between 1 and 36.');
  }

  if (row.years_assumed < 1) {
    addIssue(issues, 'error', row, 'years_assumed must be at least 1.');
  }

  if (row.school_slug === 'missouri-s-and-t' || /modeled|estimate|directional/i.test(row.source_note ?? '')) {
    modeledSchools.add(row.school_slug);
  }

  if (row.min_unweighted_gpa == null && row.max_unweighted_gpa == null) {
    noGpaSchools.add(row.school_slug);
  }

  if (row.min_act == null && row.max_act == null) {
    noActSchools.add(row.school_slug);
  }

  if (!row.source_url && !row.scholarship_page_url) {
    missingSourceSchools.add(row.school_slug);
    addIssue(issues, 'warning', row, 'missing source URL and scholarship page URL.');
  }

  if (!row.tier_last_updated && !row.school_last_updated) {
    missingUpdatedSchools.add(row.school_slug);
    addIssue(issues, 'warning', row, 'missing last-updated date.');
  }

  if (
    row.min_unweighted_gpa != null &&
    row.max_unweighted_gpa != null &&
    row.max_unweighted_gpa < row.min_unweighted_gpa
  ) {
    addIssue(issues, 'error', row, 'max GPA is below min GPA.');
  }

  if (row.min_act != null && row.max_act != null && row.max_act < row.min_act) {
    addIssue(issues, 'error', row, 'max ACT is below min ACT.');
  }

  if (row.annual_award_usd < 0 || row.projected_total_usd < 0) {
    addIssue(issues, 'error', row, 'award amount is negative.');
  }

  const expectedProjectedTotal = row.annual_award_usd * row.years_assumed;
  if (row.projected_total_usd !== expectedProjectedTotal) {
    addIssue(
      issues,
      'error',
      row,
      `projected total ${row.projected_total_usd} does not equal annual award ${row.annual_award_usd} x years ${row.years_assumed}.`
    );
  }

  if (row.residency_rule_type !== 'all_students' && normalizeStates(row.eligible_states).length === 0) {
    addIssue(issues, 'error', row, `${row.residency_rule_type} residency rule has no eligible states.`);
  }

  if (['regional', 'metro_exception'].includes(row.residency_rule_type) && !row.regional_rule_note) {
    addIssue(issues, 'warning', row, `${row.residency_rule_type} row has no regional rule note.`);
  }

  const duplicateKey = [
    row.school_slug,
    row.tier_name,
    row.min_unweighted_gpa ?? '',
    row.max_unweighted_gpa ?? '',
    row.min_act ?? '',
    row.max_act ?? '',
    row.annual_award_usd,
    row.residency_rule_type,
    normalizeStates(row.eligible_states).join('|')
  ].join('__');

  duplicateKeys.set(duplicateKey, {
    count: (duplicateKeys.get(duplicateKey)?.count ?? 0) + 1,
    row
  });
}

for (const { count, row } of duplicateKeys.values()) {
  if (count > 1) {
    addIssue(issues, 'error', row, `duplicate row appears ${count} times with the same requirements.`);
  }
}

const errors = issues.filter((issue) => issue.severity === 'error');
const warnings = issues.filter((issue) => issue.severity === 'warning');

console.log('Scholarship data audit');
console.log(`Rows: ${rows.length}`);
console.log(`Schools: ${schoolSlugs.size}`);
console.log(`Modeled schools: ${modeledSchools.size ? [...modeledSchools].sort().join(', ') : 'none detected'}`);
console.log(`Schools with at least one no-ACT row: ${noActSchools.size}`);
console.log(`Schools with at least one no-GPA row: ${noGpaSchools.size}`);
console.log(`Schools missing source on at least one row: ${missingSourceSchools.size}`);
console.log(`Schools missing last_updated on at least one row: ${missingUpdatedSchools.size}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

for (const issue of [...errors, ...warnings].slice(0, 60)) {
  console.log(`${issue.severity.toUpperCase()}: ${issue.message}`);
}

if (issues.length > 60) {
  console.log(`...and ${issues.length - 60} more issue${issues.length - 60 === 1 ? '' : 's'}.`);
}

if (errors.length > 0) {
  process.exit(1);
}
