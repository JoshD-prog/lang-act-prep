import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

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
  const headers = parseCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function sqlString(value) {
  if (value == null || value === '') return 'null';
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlNumber(value) {
  return value == null || value === '' ? 'null' : String(Number(value));
}

function sqlBoolean(value) {
  return String(value).trim().toLowerCase() === 'true' ? 'true' : 'false';
}

function sqlStates(value) {
  if (!value) return 'null';
  const states = String(value)
    .split(',')
    .map((state) => state.trim().toUpperCase())
    .filter(Boolean);

  if (!states.length) return 'null';
  return `array[${states.map(sqlString).join(', ')}]::text[]`;
}

const inputPath =
  process.argv.find((argument) => argument.startsWith('--input='))?.slice('--input='.length) ??
  'tools/fixtures/scholarship-expansion-2026.csv';
const outputPath = process.argv.find((argument) => argument.startsWith('--output='))?.slice('--output='.length);

const schoolMeta = {
  'oklahoma-state': {
    state_code: 'OK',
    city: 'Stillwater',
    website_url: 'https://go.okstate.edu/',
    sort_priority_default: 90,
    sort_priority_best_value: 90
  },
  'arkansas-state': {
    state_code: 'AR',
    city: 'Jonesboro',
    website_url: 'https://www.astate.edu/',
    sort_priority_default: 95,
    sort_priority_best_value: 95
  },
  'university-of-arkansas': {
    state_code: 'AR',
    city: 'Fayetteville',
    website_url: 'https://www.uark.edu/',
    sort_priority_default: 85,
    sort_priority_best_value: 85
  },
  nebraska: {
    state_code: 'NE',
    city: 'Lincoln',
    website_url: 'https://www.unl.edu/',
    sort_priority_default: 100,
    sort_priority_best_value: null
  }
};

const rows = parseCsvRows(readFileSync(inputPath, 'utf8'));
const schools = [...new Map(rows.map((row) => [row.school_slug, row])).values()];

const schoolValues = schools
  .map((school) => {
    const meta = schoolMeta[school.school_slug];
    if (!meta) throw new Error(`Missing metadata for ${school.school_slug}`);

    return `  (${[
      sqlString(school.school_slug),
      sqlString(school.school_name),
      sqlString(school.short_name),
      sqlString(meta.state_code),
      sqlString(meta.city),
      sqlString(meta.website_url),
      sqlString(school.scholarship_page_url),
      sqlString(school.school_notes_short),
      sqlBoolean(school.bucket_default),
      sqlBoolean(school.bucket_local),
      sqlBoolean(school.bucket_best_value),
      sqlNumber(meta.sort_priority_default),
      'null',
      sqlNumber(meta.sort_priority_best_value),
      sqlBoolean(school.school_is_active),
      sqlString(school.school_last_updated)
    ].join(', ')})`;
  })
  .join(',\n');

const tierValues = rows
  .map((row) => {
    return `  (${[
      sqlString(row.school_slug),
      sqlString(row.tier_name),
      sqlNumber(row.tier_rank),
      sqlNumber(row.min_unweighted_gpa),
      sqlNumber(row.max_unweighted_gpa),
      sqlNumber(row.min_act),
      sqlNumber(row.max_act),
      sqlNumber(row.annual_award_usd),
      sqlNumber(row.years_assumed),
      sqlString(row.residency_rule_type),
      sqlStates(row.eligible_states),
      sqlString(row.regional_rule_note),
      'true',
      sqlBoolean(row.requires_separate_application),
      sqlString(row.application_note),
      sqlBoolean(row.renewable),
      sqlString(row.renewal_note),
      'false',
      sqlBoolean(row.is_competitive),
      sqlBoolean(row.tier_is_active),
      sqlString(row.source_url),
      sqlString(row.source_note),
      sqlString(row.tier_last_updated)
    ].join(', ')})`;
  })
  .join(',\n');

const schoolSlugs = schools.map((school) => sqlString(school.school_slug)).join(', ');

const sql = `-- Seed expansion schools for the scholarship calculator.
-- Source rows live in tools/fixtures/scholarship-expansion-2026.csv.

begin;

insert into schools (
  slug,
  display_name,
  short_name,
  state_code,
  city,
  website_url,
  scholarship_page_url,
  notes_short,
  bucket_default,
  bucket_local,
  bucket_best_value,
  sort_priority_default,
  sort_priority_local,
  sort_priority_best_value,
  is_active,
  last_updated
)
values
${schoolValues}
on conflict (slug) do update
set display_name = excluded.display_name,
    short_name = excluded.short_name,
    state_code = excluded.state_code,
    city = excluded.city,
    website_url = excluded.website_url,
    scholarship_page_url = excluded.scholarship_page_url,
    notes_short = excluded.notes_short,
    bucket_default = excluded.bucket_default,
    bucket_local = excluded.bucket_local,
    bucket_best_value = excluded.bucket_best_value,
    sort_priority_default = excluded.sort_priority_default,
    sort_priority_local = excluded.sort_priority_local,
    sort_priority_best_value = excluded.sort_priority_best_value,
    is_active = excluded.is_active,
    last_updated = excluded.last_updated,
    updated_at = now();

delete from scholarship_tiers
where school_id in (
  select id
  from schools
  where slug in (${schoolSlugs})
);

insert into scholarship_tiers (
  school_id,
  tier_name,
  tier_rank,
  min_unweighted_gpa,
  max_unweighted_gpa,
  min_act,
  max_act,
  annual_award_usd,
  years_assumed,
  residency_rule_type,
  eligible_states,
  regional_rule_note,
  requires_full_time,
  requires_separate_application,
  application_note,
  renewable,
  renewal_note,
  is_major_restricted,
  is_competitive,
  is_active,
  source_url,
  source_note,
  last_updated
)
select
  schools.id,
  rows.tier_name,
  rows.tier_rank,
  rows.min_unweighted_gpa,
  rows.max_unweighted_gpa,
  rows.min_act,
  rows.max_act,
  rows.annual_award_usd,
  rows.years_assumed,
  rows.residency_rule_type,
  rows.eligible_states,
  rows.regional_rule_note,
  rows.requires_full_time,
  rows.requires_separate_application,
  rows.application_note,
  rows.renewable,
  rows.renewal_note,
  rows.is_major_restricted,
  rows.is_competitive,
  rows.is_active,
  rows.source_url,
  rows.source_note,
  rows.last_updated::date
from (
  values
${tierValues}
) as rows (
  school_slug,
  tier_name,
  tier_rank,
  min_unweighted_gpa,
  max_unweighted_gpa,
  min_act,
  max_act,
  annual_award_usd,
  years_assumed,
  residency_rule_type,
  eligible_states,
  regional_rule_note,
  requires_full_time,
  requires_separate_application,
  application_note,
  renewable,
  renewal_note,
  is_major_restricted,
  is_competitive,
  is_active,
  source_url,
  source_note,
  last_updated
)
join schools on schools.slug = rows.school_slug;

commit;
`;

if (outputPath) {
  try {
    writeFileSync(outputPath, sql);
  } catch (error) {
    if (error?.code !== 'EPERM' && error?.code !== 'EACCES') {
      throw error;
    }

    const fallbackPath = 'tmp/scholarship-expansion.sql';
    mkdirSync('tmp', { recursive: true });
    writeFileSync(fallbackPath, sql);
    console.warn(`Unable to write ${outputPath}; wrote generated SQL to ${fallbackPath} instead.`);
  }
} else {
  process.stdout.write(sql);
}
